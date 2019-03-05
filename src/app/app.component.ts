import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bgBlur = false;
  public result = {
    position1: '1st place',
    position2: '2nd place',
    position3: '3rd place',
    position4: '4th place',
    position5: '5th place'
  };
  constructor(private httpClient: HttpClient) {}

  loadPhoneNumber(positionVal) {
    const campaignData = {
      campaignCode : 'pm100',
      position : positionVal
    };
    this.bgBlur = true;
    this.httpClient
      .post('Https://live.paymasterapp.com/api/admin/winners/select', campaignData)
      .subscribe(
        data => {
          const res = JSON.parse(JSON.stringify(data));
          console.log('POST Request is successful ', res);
          if (res.status !== 'exception') {
            // setTimeout('', 5000);
            this.wait(5000);
            this.bgBlur = false;
            switch (positionVal) {
              case 1:
                this.result.position1 = res.data;
                break;
              case 2:
                this.result.position2 = res.data;
                break;
              case 3:
                this.result.position3 = res.data;
                break;
              case 4:
                this.result.position4 = res.data;
                break;
              case 5:
                this.result.position5 = res.data;
                break;
            }
          } else {
            this.bgBlur = false;
            confirm('Please try again later');
          }
        },
        error  => {
        console.log('Error', error);
        }
      );
  }
  wait(ms){
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 }
}
