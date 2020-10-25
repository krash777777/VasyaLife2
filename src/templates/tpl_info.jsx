import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import {changeTime,parseTimeData} from '../modules/options.jsx';

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';

class TabInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tabFocus:'quests'};
    }

    changeTabFocus(tabFocus){
        this.setState({tabFocus:tabFocus});
    }

    render() {

        const data = this.props.data;

        const questVision = this.state.tabFocus=='quests'?'panelVisible':'panelInvisible';
        const npcVision = this.state.tabFocus=='npc'?'panelVisible':'panelInvisible';
        const infoVision = this.state.tabFocus=='info'?'panelVisible':'panelInvisible';
        const recipesVision = this.state.tabFocus=='recipes'?'panelVisible':'panelInvisible';

        const listQuests = data.GameMarks.quests.map((quest,index) =>
            <div key={index} className="questWrapper">
                <div className="questImg">
                    <img src={quest.img}/>
                </div>
                <div className="questInfo">
                    <p className="questName">{quest.name}</p>
                    <p className="questDiscription">{quest.discription}</p>
                </div>
            </div>
        );

        const listNpc = data.Npc.map((stringNpc, index)=>

            <div key={index} className="npcWrapper">

                <div className="npcInfoRow">
                    <div className="npcIco">
                        <img src={stringNpc.npc.ico}/>
                    </div>

                    <div className="npcInfoShell npcDiscription">
                        <p>{stringNpc.npc.name}</p>
                        <p className="npcDiscriptionComment">{stringNpc.npc.discription}</p>
                    </div>

                    <div className="npcInfoShell npcOptionsShell">
                        <div className="npcOption">
                            <p className="npc-options-header npc-option-name">Отношения: </p>
                            <img src={Images.ico.relations} className="npc-options-ico"/>
                            <div className="npc-options-value">{stringNpc.relations}</div>
                        </div>
                        <div className="npcOption">
                            <p className="npc-options-header">Похоть: </p>
                            <img src={Images.ico.corruption} className="npc-options-ico"/>
                            <div className="npc-options-value">{stringNpc.corruption}</div>
                        </div>
                    </div>
                </div>


                {/*<p>*/}
                    {/*<span className="npcName">{stringNpc.npc.name}</span>*/}
                    {/*<span className="npcChar">Отношения: <span className="npcInfoDiscriptionValue">{stringNpc.relations}</span></span>*/}
                    {/*<span className="npcChar">Похоть: <span className="npcInfoDiscriptionValue">{stringNpc.corruption}</span></span>*/}
                {/*</p>*/}

                {/*<div className="npcIco">*/}
                    {/*<img src={stringNpc.npc.ico}/>*/}
                {/*</div>*/}
                {/*<div className="npcInfo">*/}
                    {/*<p className="npcName">{stringNpc.npc.name}</p>*/}
                    {/*<p className="npcDiscription">{stringNpc.npc.discription}</p>*/}
                {/*</div>*/}
            </div>
        );

        const listRecipes = data.Player.recipesAccess.map((arrRecipes, index)=>
            <div key={index}>

                <div className="recipeItemShell">
                    <p>Ингридиенты</p>

                    {arrRecipes.recipe.consist.map((ingr, ingrIndex) =>
                        <div key={ingrIndex} className="ingrItem">
                            <img src={ingr.item.image}/>
                            <span className="recipeNumberOfItems">{ingr.quantity}</span>
                        </div>
                    )}
                </div>

                <div className="recipeDecorEquals">=</div>

                <div className="recipeResultShell">
                    {arrRecipes.recipe.result.map((result, resultIndex) =>
                        <div  key={resultIndex} className="recipeItem">
                            <img src={result.item.image}/>
                            <span className="recipeNumberOfItems">{result.quantity}</span>
                        </div>
                    )}
                </div>

                {/*<div className="recipeItemShell recipeItemDiscription-width">*/}
                    {/*<p>Наименование комплекта</p>*/}
                    {/*<p className="recipeItemDiscription">{arrRecipes.recipe.discription}</p>*/}
                {/*</div>*/}

                {/*<div className="recipeItemShell effects-width">*/}
                    {/*<p>Эффекты</p>*/}
                    {/*<div className="component">*/}
                        {/*<div className="componen-img"><img src={Images.items.food.apple}/></div>*/}
                        {/*<div className={'increase' =='increase'?'component-value-plus':'component-value-minus'}>{'increase' == 'increase'?'+':'-'}{1}</div>*/}
                    {/*</div>*/}
                {/*</div>*/}


            </div>
        );

        return (
            <div>
                <div className="infoBackground"></div>

                <div className={questVision+' info'}>
                    <p className={questVision+' tabHeader'}>Квесты</p>
                    {listQuests}
                </div>

                <div className={npcVision+' info'}>
                    <p className={npcVision+' tabHeader'}>Персонажи</p>
                    {listNpc}
                </div>

                <div className={recipesVision+' info'}>
                    <p className={recipesVision+' tabHeader'}>Доступные рецепты</p>
                    {listRecipes}
                </div>

                <div className={infoVision+' info'}>
                    <p className={infoVision+' tabHeader'}>Информация</p>
                </div>

                <div className="tablet-control-panel">
                    <div className="tablet-control-panel-button" onClick={()=>this.changeTabFocus('quests')}><img src={Images.ico.tasks}/></div>
                    <div className="tablet-control-panel-button" onClick={()=>this.changeTabFocus('npc')}><img src={Images.ico.npc2}/></div>
                    <div className="tablet-control-panel-button" onClick={()=>this.changeTabFocus('recipes')}><img src={Images.ico.orbGreen}/></div>
                    <div className="tablet-control-panel-button" onClick={()=>this.changeTabFocus('info')}><img src={Images.ico.info}/></div>
                </div>
            </div>
        )
    }
}

class Information extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.props.data.GameMarks);

        const data = this.props.data;

        const Time = parseTimeData(this.props.data.General.dateAndTime.time);
        return (
            <div id="background">

                <div className="tpl-background">
                    <img src={data.General.location.img} style={{width:'100%'}}/>
                </div>

                <CSSTransitionGroup
                    transitionName="fadeRight"
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={false} transitionEnterTimeout={500}
                    transitionLeave={false} transitionLeaveTimeout={500}
                >
                    <div className="centered container_layer txt-no-select">

                        <div className="centered container_layer">
                            <div className="tablet ">
                                <div className="camDecor">
                                    <img src={Images.ico.tabCam}/>
                                </div>

                                <div className="tablet-info-conteiner centered">

                                    <TabInformation data={data}/>

                                    <img src={Images.backgrounds.tabBackground}/>

                                    <div className="tablet-decor">
                                        <div className="tablet-decor-block">
                                            <a>{Time.prefixH}{Time.hours}<span>:</span>{Time.prefixM}{Time.minutes}</a>
                                        </div>
                                        <img className="tablet-decor-block" src={Images.ico.battary}/>
                                        <img className="tablet-decor-block" src={Images.ico.tabInternetAccess}/>
                                    </div>


                                    {/*<div className="tablet-control-panel">*/}
                                        {/*<div className="tablet-control-panel-button" onClick={()=>this.changeTabFocus('npc')}><img src={Images.ico.npc2}/></div>*/}
                                        {/*<div className="tablet-control-panel-button" onClick={()=>this.changeTabFocus('quests')}><img src={Images.ico.tasks}/></div>*/}
                                        {/*<div className="tablet-control-panel-button" onClick={()=>this.changeTabFocus('info')}><img src={Images.ico.info}/></div>*/}
                                    {/*</div>*/}
                                </div>


                                <div className="tab-close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>
                                    <img src={Images.ico.power}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Information;