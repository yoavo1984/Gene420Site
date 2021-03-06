import {Component, OnInit, ViewChild} from '@angular/core';
import {StrainDaoService} from "../../../cannabis/services/strain-dao.service";
import {EventBusService} from "../../../services/event-bus.service";

@Component({
  selector: 'gene420-strain-carousel',
  templateUrl: './strain-carousel.component.html',
  styleUrls: ['./strain-carousel.component.css']
})
export class StrainCarouselComponent implements OnInit {

  private strainsRemote;
  private strains = [];
  public loaded = false;
  private innerHeight;
  private innerWidth;
  private strainHeight;
  constructor(private strainDaoService:StrainDaoService, private eventBus:EventBusService) {

  }

  ngOnInit() {
    this.strainsRemote = this.strainDaoService.getAllStrains();
    this.strainsRemote.subscribe((strains)=>{
      this.strains = strains.slice(0,5);
      this.loaded = true;
    })

  }

  getStrainHeight(){
    return window.screen.height-550; //TODO: currently very specific
  }



  reviewStrain(event){
    //this.reviewStrainModal.open(event.name, event.imageUrl);
  }

  strainHovered(data){
    this.eventBus.publish("StrainHovered", {name:data.name});
  }

  strainHoverEnded(data){
    this.eventBus.publish("StrainHoverEnded", {name:data.name});
  }

  next(){

  }

  prev(){

  }

  onSelectedStrain(item){
    this.eventBus.publish("StrainHovered", {name:item.name});
  }

}
