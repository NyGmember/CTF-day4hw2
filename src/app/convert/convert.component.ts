import { Component, OnInit } from '@angular/core';
import { ExchangeService } from "../exchange.service";
import { SelectItem } from "primeng/api";
import { MenuItem } from "primeng/api";

interface curencySymbol {
    name: string,
    code: string,
    label: string
}

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {

  symbols: curencySymbol[] = [];
  fromSymbol: string;
  toSymbol: string;
  fromAmont: number = 10.0;
  toAmont: number = 0.0;
  rate: number;

  constructor(private exchange: ExchangeService) { 

  }

  ngOnInit(): void {
    this.exchange.getSymbol()
      .subscribe(data => {
        for(let key in data.symbols){
          this.symbols.push({
            name: data.symbols[key],
            code: key,
            label: key+' | '+data.symbols[key]
          });
        }
      });
  }

  getExchange(){
    if(typeof(this.fromSymbol) == 'undefined' || typeof(this.toSymbol) === 'undefined'){
      alert("Please choose curency!");
      return;
    }

    this.exchange.getRate()
      .subscribe(result => {
        if(!result.success){
          alert("Error: " + result.error.info);
        }else{
          this.rate = result.rates[this.toSymbol]/result.rates[this.fromSymbol];
          this.toAmont = this.fromAmont * this.rate;
        }
      });
  }
}
