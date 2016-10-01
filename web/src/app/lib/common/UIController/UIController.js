import {updateActiveContainer,changeTitle,loadConnectedContainer} from 'lib/common/actions';
/**
 * This class help controllers classes deal with rendering components in the DOM
 *
 * It is possible to create a custom container loader by using setCustomContainerLoader
 * The custom container loader should use  this form:
 * 			function customContainerLoader(container,info,params)
 * 			where params:object represent a custom parameter which is used anytime the function is called
 *
 * @export
 * @class UIController
 */
/**
 *
 *
 * @export
 * @class UIController
 */
export default class UIController{


    /**
     * Creates an instance of UIController.
     *
     * @param {object} store
     *
     * @memberOf UIController
     */
    constructor(store){
        this.store=store;
        this.dispatch=store.dispatch;
        this.customContainerLoader=undefined;//In case we want to definer a custon containerLoader
        this.customLoaderParam={};

    };
    /**
     *
     *
     * @param {any} loader
     * @param {any} customLoaderParameter
     *
     * @memberOf UIController
     */
    setCustomContainerLoader(loader,customLoaderParameter){
        this.customContainerLoader=loader;
        this.customLoaderParam=customLoaderParameter;
    }

    /**
     *
     *
     * @param {any} Container
     * @param {any} Info
     * @returns
     *
     * @memberOf UIController
     */
    defaultContainerLoader(Container,Info){
        if (Info!='undefined') this.updateActiveContainer(Info);
        return this.dispatch(loadConnectedContainer(Container,this.store,this.customLoaderParam));
    };

    /**
     * Load container
     *
     * @param {Component} Container
     * @param {Object} containerInfo
     * @returns
     *
     * @memberOf UIController
     */
    loadContainer(Container,containerInfo){
        if (this.customContainerLoader===undefined){
            return this.defaultContainerLoader(Container,containerInfo);
        }
        else
        if (typeof this.customContainerLoader==='function'){
            return this.customContainerLoader(Container,{containerInfo,...this.customLoaderParam});
        }
    }
    changeTitle(title,icon=undefined){
        return this.dispatch(changeTitle(title,icon));
    };
    updateActiveContainer(info){
        return this.dispatch(updateActiveContainer(info));

    };
    route(location){
        window.location.hash='#'+location;
    }


}
