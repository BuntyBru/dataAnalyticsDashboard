import { Injectable } from '@angular/core';

@Injectable()
export class PeriodsService {
  getYears() {
    return [
      '2010', '2011', '2012',
      '2013', '2014', '2015',
      '2016', '2017', '2018',
    ];
  }

  getMonths() {
    return [
      '1', '2', '3',
      '4', '5', '6',
      '8', '9', '10',
      '11', '12', '13',
      '14','15','16','17',
      '18' ,'19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29' ,'30'
    ];
  }

  getWeeks() {
    return [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ];
  }
}
