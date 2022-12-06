import { LightningElement,api,wire } from 'lwc';
import { subscribe,MessageContext } from 'lightning/messageService';
import Lds_Object from '@salesforce/messageChannel/Count_Updated__c';
export default class Numerator extends LightningElement {
   @api counter = 0;
   subscription = null;
   
   @wire(MessageContext) msgContext;

   connectedCallback()
   {
    this.subscribeToMsgChannel();
   }
   subscribeToMsgChannel()
   {
    this.subscription = subscribe(this.msgContext, Lds_Object, (msg)=>this.handleMsg(msg) );
   }
   handleMsg(message)
   {
    this.counter = message.constant;
   }

    handleIncrement()
    {
        this.counter++;
    }
    handleDecrement()
    {
        this.counter--;
    }
    handleMultiply(event)
    {
        const factor = event.detail;
        this.counter *= factor;
    }
    @api
    maximizeCounter()
    {
        this.counter += 1000000;
    }
}