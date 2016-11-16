import React from 'react';
import ReactDOM from 'react-dom';


export function CreateNavPanel(title,icon,Content=undefined){

    var NavPanelContainer=document.getElementById('nav-panel-container');
    var NewPanel=document.createElement('li');
    var newPanelId=++window.schNavPanelsCount;
    /** Panel */
    NewPanel.id=newPanelId;
    NewPanel.className='dropdown';
    NewPanel.innerHTML=` <a class="dropdown-toggle"  data-toggle="dropdown" href="#" alt="${title}">
                            <i class=${icon} id="${newPanelId}-icon"></i>
                            <i class="fa fa-caret-down"></i>
                        </a> `;
    NavPanelContainer.appendChild(NewPanel);

    /** Render the dropdown panel content */
    if  (Content){
        ReactDOM.render(<Content ondelete={deleteNavPanel} panelId={newPanelId} />,NewPanel);
    }
    return newPanelId;

}

export  function UpdateNavPanelPadge(panelId,label){
    var Panel=document.getElementById(panelId);
    var Icon=Panel.getElementById(panelId+'-icon');
    Icon.innerHTML=`<span class="label> ${label} </span>`;
}

function deleteNavPanel(panelId){
    ReactDOM.unmountComponentAtNode(panelId);
}

function Panel(title,icon,Content){

}