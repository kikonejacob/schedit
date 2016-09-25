import Backbone from'backbone';
import Radio from 'backbone.radio';
import GR from '../components/gridFormView/schgridview.js';
import zig from '../forms/students/show'
import React from 'react';
import modal from './modal';


 class AppRouter extends Backbone.Router {

    initialize(options) {
      console.log('eeeeeeeeeeeeeee');
      super.initialize(options);
      this.channel=Radio.channel('services');
      this.route('home', 'home');
      this.route('', 'home');
      /*this.route('students','student_list');
      this.route('students/:studentId', 'student');
      this.route('students/:studentId/tuition', 'studentTuition');
      this.route('kkk',"kkk")*/
     
     
    }
    configureChannel(){

      this.channel.on('regRoute',this.regRoute.bind(this));
    }

     start() {
      Backbone.history.start({pushState: false,root:"/app/"});
    }

    regRoute(route,name,func){

      this.route(route,name,func);
    }
    /*kkk(){

      modal();
    }
   

    student_list(){

      var channel=Radio.channel('services.students');
      channel.trigger('list');
      console.log("loading student list");


    }

    student(studentId){
      var channel=Radio.channel('services.students');
      channel.trigger('show',studentId);
      console.log("loading student");


    }
    studentTuition(){


    }*/

    home(options) {
      this.channel.request('Versements');
      console.log(GR.SchGridView);
      zig('module_container');
       /*React.render(<GR.SchGridView collection={new GR.PageBeta} />,
   document.getElementById('module_container'));*/
  
      console.log('ddffd');
    	
    }

}

var bela= new AppRouter;


export default bela ;





