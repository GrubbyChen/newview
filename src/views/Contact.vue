<template>
  <div class="nv-aboutus">
    <section>
      <v-layout column wrap align-center>
        <v-flex style="width: 100%;">
          <v-img src="/contact/top_bk.jpg" lazy-src="/contact/sm_top_bk.jpg" width="100%" height="480px"></v-img>
        </v-flex>
      </v-layout>
    </section>
    <section class="py-4">
      <v-layout column wrap align-center>
        <v-flex xs12 sm4 my-5>
          <div class="nv-title">CONTACT</div>
        </v-flex>
        <v-flex mb-5 style="width: 1200px;">
          <v-container grid-list-xl>
            <v-layout row wrap align-start>
              <v-flex xs12 md6>
                <div class="text-xs-center nv-contact-icon">
                  <v-icon x-large style="color: #444;">location_on</v-icon>
                </div>
                <div class="layout justify-center nv-contact-text">
                  <div class="text-xs-center" style="font-size: 16px;">〒166-0002東京都杉並区高円寺北1-21-5 4F-1</div>
                </div>
              </v-flex>
              <!-- <v-flex xs12 md4>
                <div class="text-xs-center nv-contact-icon">
                  <v-icon x-large style="color: #444;">phone</v-icon>
                </div>
                <div primary-title class="layout justify-center nv-contact-text">
                  <div class="text-xs-center" style="font-size: 16px;">0755-86518755 / 86518753</div>
                </div>
              </v-flex> -->
              <v-flex xs12 md6>
                <div class="text-xs-center nv-contact-icon">
                  <v-icon x-large style="color: #444;">email</v-icon>
                </div>
                <div primary-title class="layout justify-center nv-contact-text">
                  <div class="text-xs-center" style="font-size: 16px;">info@newview.co.jp</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex class="mb-4" style="width: 1200px;">
          <v-form v-model="valid" ref="form" class="px-5">
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader align-end>お名前<span class="required">(必須)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.name"
                  :rules="nameRules"
                  label="お名前"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>メールアドレス<span class="required">(必須)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="メールアドレス"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>御社名<span class="required">(必須)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.company"
                  :rules="companyRules"
                  label="御社名"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>電話番号<span class="required">(必須)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.phone"
                  :rules="phoneRules"
                  label="電話番号"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>お間い合わせ内容<span class="required">(必須)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-textarea
                  v-model="form.message"
                  :rules="messageRules"
                  name="input-7-1"
                  label="お間い合わせ内容"
                  rows="8"
                  :counter="1000"
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-layout row mt-2>
              <v-flex xs9 offset-xs3>
                <p class="message-success-tips" :class="{ 'show': messageSendSuccess }">送信完了</p>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
        <v-flex xs12 sm4 mb-5 class="mt-5 mb-4">
          <a class="nv-page-button" @click="sendEmail">送信</a>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
import axios from '@/tools/axios'

export default {
  // components: { WorksImage },
  data () {
    return {
      topbkSrc: '/contact/sm_top_bk.jpg',
      messageSendSuccess: false,
      valid: false,
      form: {
        name: '',
        phone: '',
        email: '',
        message: ''
      },
      nameRules: [
        v => !!v || 'Name is required'
      ],
      phoneRules: [
        v => !!v || 'Tel is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required'
      ],
      companyRules: [
        v => !!v || 'Company is required'
      ],
      messageRules: [
        v => !!v || 'Message is required',
        v => v.length <= 128 || 'Name must be less than 128 characters'
      ]
    }
  },
  methods: {
    async sendEmail () {
      if (this.$refs.form.validate()) {
        await axios.post('/gateway/sendEmail', this.form)
        this.messageSendSuccess = true
        setTimeout(() => {
          this.messageSendSuccess = false
        }, 3000)
      }
    }
  }
}
</script>
