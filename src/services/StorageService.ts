import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {
  }

  getAllRodsPromise() {
    return this.storage.get('rodsStore');
  }

  createNewRod(rodNumber) {
    let dateValue = this.createDocumentCreationDate();
    return {
      id: rodNumber,
      documentNumber: 'ROD-' + rodNumber + "-" + dateValue,
      creationDate: dateValue,
      planPosition: '',
      direction: '',
      executor: '',
      synchronized: 'false',
      finished: 'false'
    };
  }

  private createDocumentCreationDate() {
    let currentDate = new Date();
    return currentDate.getFullYear() + "-"
           + ("0" + (currentDate.getMonth() + 1)).slice(-2) + "-"
           + ("0" + currentDate.getDate()).slice(-2);
  }

  saveRod(rod) {
    this.storage.get('rodsStore').then((val) => {
      if(val) {
        console.log('Retrieved rods', val);
      } else {
        console.log('Your rodsStore empty ');
        val = {counter:0, rods:new Map()};
      }
      val.counter ++;
      console.log('Saving map id:', rod.id);
      console.log('Saving map value:', rod);
      val.rods.set(rod.id, rod);
      console.log('Saving rods', val);
      this.storage.set('rodsStore', val);
    })
  }

}