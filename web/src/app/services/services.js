//import StudentController from './studentsService.js';
import MenuSvc from './MenuService';
import ModuleSvc from './ModuleService';
//import AppRouter from "./RouterService";
import AppRouter from '../routers/index.js';
import ChannelConnection from './servicesChannels';
import {configureStore} from './globalstore.js';

/*import studentListSvc from "./studentlistService";
import studentsvc from './studentsService';
import inscriptsvc from './inscript';*/


export const registry=configureStore({});


export default function services() {
    this.channel = new Channels( 'services' );
    services.defaultChannel=ChannelConnection('services');
};
services.responsiveRender=function(){
  //Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        let height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    let url = window.location;
    let element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }

};
services.autorun = function(){
    services.Router=AppRouter({store:registry,responsivefunc:services.responsiveRender});/* first service */
    services.Module=new ModuleSvc();

    //services.registry=store({});
  /*services.student=new StudentController();
    services.studentlist=new studentListSvc();
    services.student=new studentsvc();
    services.inscript=new  inscriptsvc();*/
    services.Router.start();
    services.responsiveRender();


}


    /*this.student=StudentController;

    this.Menu=MenuService;

    this.Router=RouterService;
*/



;
