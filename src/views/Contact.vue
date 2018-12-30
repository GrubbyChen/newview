<template>
  <div class="nv-aboutus">
    <section>
      <v-layout column wrap align-center>
        <v-flex style="width: 100%;">
          <v-img src="/contact/top_bk.jpg" width="100%" height="520px"></v-img>
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
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large style="color: #444;">location_on</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="text-xs-center" style="font-size: 16px;">深圳市宝安区留仙大道2号</div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large style="color: #444;">phone</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="text-xs-center" style="font-size: 16px;">0755-86518755 / 86518753</div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large style="color: #444;">email</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="text-xs-center" style="font-size: 16px;">sales@frontsurf.com</div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex class="mb-4" style="width: 1200px;">
          <v-form v-model="valid" ref="form" class="px-5">
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader align-end>Name<span class="required">(必须)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.name"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>Tel<span class="required">(必须)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.phone"
                  :rules="phoneRules"
                  label="Tel"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>E-mail<span class="required">(必须)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>Company<span class="required">(必须)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  v-model="form.company"
                  :rules="companyRules"
                  label="Company"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mt-4>
              <v-flex xs3>
                <v-subheader>Message<span class="required">(必须)</span></v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-textarea
                  v-model="form.message"
                  :rules="messageRules"
                  name="input-7-1"
                  label="Message"
                  rows="8"
                  :counter="1000"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
        <v-flex xs12 sm4 mb-5 class="mt-5 mb-4">
          <a class="nv-page-button" @click="sendEmail">提交留言</a>
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
      tabs: 'image',
      page: 1,
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
      }
    }
  }
}
</script>
