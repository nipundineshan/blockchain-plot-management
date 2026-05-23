import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { PinataSDK } from "pinata";

@Injectable()
export class IpfsService {
  private readonly logger = new Logger(IpfsService.name);

  private pinata: PinataSDK;

  constructor(private configService: ConfigService) {
    const pinataJwt = this.configService.get<string>('PINATA_JWT');
    const pinataGateway = this.configService.get<string>('PINATA_GATEWAY');

    if (pinataJwt) {
      this.pinata = new PinataSDK({
        pinataJwt: pinataJwt,
        pinataGateway: pinataGateway,
      });
      this.logger.log('Pinata SDK initialized successfully');
    } else {
      this.logger.warn('PINATA_JWT missing. IPFS uploads will fail.');
    }
  }

  async uploadJson(metadata: Record<string, unknown>): Promise<string> {
    try {
      const upload = await this.pinata.upload.public.json(metadata);
      return upload.cid;
    } catch (error) {
      this.logger.error('Error uploading JSON to IPFS', error);
      throw error;
    }
  }

  async uploadFile(filePath: string, name: string): Promise<string> {
    try {
      const fileContent = fs.readFileSync(filePath);
      const blob = new Blob([fileContent]);
      const file = new File([blob], name);
      
      const upload = await this.pinata.upload.public.file(file);
      return upload.cid;
    } catch (error) {
      this.logger.error('Error uploading file to IPFS', error);
      throw error;
    }
  }
}
