import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  connects: FirebaseListObservable<any>;
  public user: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
	 this.user = JSON.parse(localStorage.getItem("user"));
	 this.connects = af.database.list('/connects/'+this.user.id);
  }

	 showOptions(connectId, connectName) {
		let actionSheet = this.actionSheetCtrl.create({
		  title: 'What do you want to do?',
		  buttons: [
			 {
				text: 'Delete Connect',
				role: 'destructive',
				handler: () => {
				  this.removeConnect(connectId);
				}
			 },
			 {
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
				  console.log('Cancel clicked');
				}
			 }
		  ]
		});
		actionSheet.present();
	 }

	 removeConnect(connectId: string){
		this.connects.remove(connectId).then(data => {
					 let toast = this.toastCtrl.create({
						message: 'Connect was deleted successfully',
						duration: 3000
					 });
					 toast.present();
				}
		  );
	 }
}
