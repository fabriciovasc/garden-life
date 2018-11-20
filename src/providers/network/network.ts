import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Events } from 'ionic-angular';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable()
export class NetworkProvider {

  previousStatus;

  constructor(
    public network: Network,
    public eventCtrl: Events) {
    console.log('Hello...');
    this.previousStatus = ConnectionStatusEnum.Online;
  }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        this.eventCtrl.publish('network:off');
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });

    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (this.previousStatus === ConnectionStatusEnum.Offline) {
          this.eventCtrl.publish('network:on');

        }

        this.previousStatus = ConnectionStatusEnum.Online;
      }, 3000);
    });

  }

}
