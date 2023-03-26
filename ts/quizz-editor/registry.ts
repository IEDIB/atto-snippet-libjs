import { genID } from "../_shared/utilsShared";
import QuizzComponent from "./quizzEditorComponent";
import { WidgetElement } from "./widgetElement";

// Maps id-HTMLElement into the object of the group
const dictGroups: {[key: string]: QuizzComponent} = {};
// Maps id-HTMLElement of the group into the list of widgets that contains
const dictWidgets: {[key: string]: WidgetElement[]}= {};

function addGroup(quizzComponent: QuizzComponent): void {
    let id = quizzComponent.parent.getAttribute("id");
    if(!id) {
        id = genID();
        quizzComponent.parent.setAttribute("id", id);
    }
    dictGroups[id] = quizzComponent;
}

function addWidget(widgetElement: WidgetElement): void {
    // Search its closest group
    const groupElem = widgetElement.closest('div[data-quizz-group]');
    if(groupElem && groupElem.getAttribute('id')) {
        const id = groupElem.getAttribute('id') || '';
        let listWidgets = dictWidgets[id];
        if(!listWidgets) {
            listWidgets = [];
            dictWidgets[id] = listWidgets;
        }
        listWidgets.push(widgetElement);
    }
}

function removeWidget(widgetElement: WidgetElement): void {
    //The problem is that it has been removed from dom so we cannot call closest
    //Then must search on all groups
    Object.keys(dictWidgets).forEach( idGroup => {
        const idx = dictWidgets[idGroup].indexOf(widgetElement);
        if(idx >= 0) {
            dictWidgets[idGroup].splice(idx, 1);
        }
    });
}

// To be used by the group to know about widgets
function findWidgetsForGroup(quizzComponent: QuizzComponent): WidgetElement[] { 
    const id = quizzComponent.parent.getAttribute("id");
    if(id && dictWidgets[id]) {
        return dictWidgets[id];
    }
    return [];
}

// To be used by widgets to know about the group
function findGroupObject(widgetElement: WidgetElement): QuizzComponent | null {
    const groupElem = widgetElement.closest('div[data-quizz-group]') as HTMLElement;
    if(groupElem && groupElem.getAttribute('id')) {
        const id = groupElem.getAttribute('id') || '';
        let found = dictGroups[id];
        if(!found) {
            //Possibly the group is added after the page is loaded
            //Create it dynamically
            found = new QuizzComponent(groupElem);
            addGroup(found);
        }
        return found;
    }
    return null;
}

export default {
    addGroup: addGroup,
    addWidget: addWidget,
    removeWidget: removeWidget,
    findWidgetsForGroup: findWidgetsForGroup,
    findGroupObject: findGroupObject
}