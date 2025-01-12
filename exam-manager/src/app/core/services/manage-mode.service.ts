import { Injectable } from '@angular/core';
import { DataManageModes } from '../enums/manage-mode.enum';

@Injectable({
  providedIn: 'root'
})
export class ManageModeService {

  getManageMode(url: string):number | undefined{
    if(url.includes('create')){
      return DataManageModes.Create
    }
    if(url.includes('edit')){
      return DataManageModes.Edit
    }
    if(url.includes('view')){
      return DataManageModes.View
    }
    return undefined;
  }
}
