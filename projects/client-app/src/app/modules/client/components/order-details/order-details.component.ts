import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanvasService, ClientCompany, LangService, ModalService } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Routing } from '../../../core/routes/app-routes';
import { NotificationService } from '../../../core/services/notifications.service';
import { OfferDetailsService } from '../../services/offer-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id!: string
  data!: any
  offerId!: string
  acceptModal = 'acceptModal'
  rejectModal = 'rejectModal'
  finalrejectModal = 'finalrejectModal'
  offerDetails!: any
  messages!: any
  messageLength: number = 0
  negotiationCanvas = 'negotiationCanvas'
  reasonForm!: FormGroup
  messageForm: FormGroup = this.fb.group({
    clientPriceOffersId: '',
    securityCompanyBranchId: '',
    securityCompanyId: null,
    clientCompanyId: null,
    message: ['', [Validators.required]],
    messageFrom: 1
  });
  constructor(
    private modal: ModalService,
    private offerServices: OfferDetailsService,
    private route: ActivatedRoute,
    public lang: LangService,
    public fb: FormBuilder,
    private auth: AuthService,
    private canvasService: CanvasService,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.reasonForm = this.fb.group({
      reson: [null, Validators.required]
    })
    this.route.params.subscribe((res: any) => {
      this.id = res?.id
    })
    this.getOffer()
  }
  getOffer() {
    this.activatedRoute.data.subscribe((response: any) => {
      this.data = response.details;
      console.log(this.data);

      this.getMessages(this.data[0].offerPriceGuardsShifts[0].clientPriceOffersId)


      this.messageForm.controls['securityCompanyId'].setValue(this.data[0].securityCompanyId)
      this.messageForm.controls['securityCompanyBranchId'].setValue(this.data[0].securityCompanyBranchId)
      this.messageForm.controls['clientPriceOffersId'].setValue(this.data[0].id)
    });
  }

  accept(id: string) {
    this.offerServices.approveOffer(id).subscribe((res) => {
      if (res) {
        let notification = {
          titile: "تم قبول عرض السعر ",
          titileEn: "offer accepted",
          description: "تم قبول عرض السعر من قبل المنشأه",
          descriptionEn: "The price offer has been accepted by the company",
          appUserId: (this.auth.snapshot.userInfo as ClientCompany).appUserId,
          securityCompanyId: this.data[0].securityCompanyId,
          securityCompanyBranchId: this.data[0].securityCompanyBranchId
        }
        this.notification.addNotify(notification).subscribe((res) => {

        })
        this.updateStatus(id, 2)
        this.modal.open(this.acceptModal)
      }
    })

  }

  continue() {
    this.modal.close(this.acceptModal)
    this.router.navigate([`/${Routing.client.module}/${Routing.client.children.manageOrders}/${Routing.client.children.allOrders}`]);
  }
  reject(id: string) {
    this.offerId = id
    this.modal.open(this.rejectModal)
  }
  confirm(reason: FormGroup) {
    if (reason.invalid) return
    let reasonVariable = reason.value.reson
    let id = this.offerId
    this.updateStatus(id, 5)
    this.offerServices.rejectOffer(id, reasonVariable).subscribe((res) => {
      if (res) {
        let notification = {
          titile: "تم رفض عرض السعر  ",
          titileEn: "The price offer was rejected",
          description: " تريد المنشأة المفوضة على عرض السعر برجاء مراجعه طلبات العملاء",
          descriptionEn: "The company wants to negotiate the price offer, please review the customer requests",
          appUserId: (this.auth.snapshot.userInfo as ClientCompany).appUserId,
          securityCompanyId: this.data[0].securityCompanyId,
          securityCompanyBranchId: this.data[0].securityCompanyBranchId
        }
        this.notification.addNotify(notification).subscribe((res) => {

        })
        this.modal.close(this.rejectModal)
        this.router.navigate([`/${Routing.client.module}/${Routing.client.children.manageOrders}/${Routing.client.children.allOrders}`]);
      }
    })
  }
  updateStatus(id: string, value: number) {
    this.offerServices.updateStatus(id, value).subscribe((res) => {
      this.getOffer()
    })
  }
  FinalRejection(id: string) {
    this.updateStatus(id, 4)
    let notification = {
      titile: "تم رفض عرض السعر نهائيا ",
      titileEn: "The price offer was finally rejected",
      description: "تم رفض عرض السعر  نهائيا من قبل المنشأة",
      descriptionEn: "The price offer has been finally rejected by the company",
      appUserId: (this.auth.snapshot.userInfo as ClientCompany).appUserId,
      securityCompanyId: this.data[0].securityCompanyId,
      securityCompanyBranchId: this.data[0].securityCompanyBranchId
    }
    this.notification.addNotify(notification).subscribe((res) => {

    })
    this.modal.open(this.finalrejectModal)
  }
  done() {
    this.modal.close(this.finalrejectModal)
    this.router.navigate([`/${Routing.client.module}/${Routing.client.children.manageOrders}/${Routing.client.children.allOrders}`]);
  }
  negotiation(data: any) {
    this.offerDetails = data
    this.getMessages(this.offerDetails.id)
    this.canvasService.open(this.negotiationCanvas)

  }
  getMessages(id: string) {
    this.offerServices.getMessages(id).subscribe((res: any) => {
      this.messages = res
      this.messageLength = this.messages.length
      this.messageForm?.controls['clientCompanyId']?.setValue(this.messages[0].clientCompanyId)
    })
  }
  sendMessage(formMessage: FormGroup) {
    if (formMessage.invalid) return;
    this.offerServices.sendMessage(formMessage.value).subscribe((res: any) => {
      let notification = {
        titile: "تم إرسال رسالة في المفاوضة من قبل المنشأة ",
        titileEn: "A message was sent in the negotiation by the  company",
        description: "تم إرسال رسالة في المفاوضة من قبل المنشأة",
        descriptionEn: "A message was sent in the negotiation by the company",
        appUserId: (this.auth.snapshot.userInfo as ClientCompany).appUserId,
        securityCompanyId: this.data[0].securityCompanyId,
        securityCompanyBranchId: this.data[0].securityCompanyBranchId
      }
      this.notification.addNotify(notification).subscribe((res) => {
  
      })
      this.messageForm.controls['message'].reset();
      this.getMessages(this.offerDetails.id)
    })
  }
}
