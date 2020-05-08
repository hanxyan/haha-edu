<template>
	<div>
		<div class="layout-header">
			
		</div>
		<div class="layout-content">
			<van-row type="flex" justify="center">
				<van-col span="5" />
				<van-col span="14">
					<img 
					:src="logoImg" 
					style="width:100%;height:auto!important;" 
					/>
				</van-col>
				<van-col span="5" />
			</van-row>
			<form class="login-form">
				<van-cell-group 
				class="cell-group" 
				:border="false">
					<van-field 
					v-model="formItem.account" 
					placeholder="请输入手机号"
					type="tel"
					class="cell-field"
					clearable
					:error-message="validatorObj.errMsg.account"
					:disabled="telFieldDisabled"
					@input="telInputEvt">
						<template v-slot:left-icon>
							<svg class="uficon" aria-hidden="true">
								<use xlink:href="#uficon-yonghu"></use>
							</svg>
						</template>
					</van-field>
					<van-field 
					v-show="!loginByPws"
					v-model="formItem.captcha" 
					center
					:error-message="validatorObj.errMsg.captcha"
					placeholder="请输入验证码"
					class="cell-field">
						<template v-slot:left-icon>
							<svg class="uficon" aria-hidden="true">
								<use xlink:href="#uficon-pws"></use>
							</svg>
						</template>
						<van-button 
						v-show="!computedTime"
						slot="button" 
						size="small" 
						round
						:color="themePriamryColor"
						:disabled="codeBtnIsDisabled"
						class="code-btn"
						@click="getCaptchaMsg">
						获取验证码
						</van-button>
						<van-button 
						v-show="computedTime"
						slot="button" 
						size="small" 
						round
						:color="themePriamryColor"
						disabled
						class="code-btn">
						剩余{{computedTime}}s
						</van-button>
					</van-field>
					<van-field 
					v-model="formItem.password" 
					v-show="loginByPws"
					center
					clearable
					:error-message="validatorObj.errMsg.password"
					placeholder="请输入登录密码"
					class="cell-field"
					:right-icon="pwsRightIcon"
					:type="pwsShowType"
					@click-right-icon="togglePws">
						<template v-slot:left-icon>
							<svg class="uficon" aria-hidden="true">
								<use xlink:href="#uficon-pws"></use>
							</svg>
						</template>
					</van-field>
				</van-cell-group>				
			</form>
			<section>
				<van-button 
				round
				block
				:style="loginBtnStyle"
				:disabled="loginBtnDisabled"
				@click="loginBtnClickEvt">{{loginByPws?'账号登录':'快捷登录'}}</van-button>
			</section>
			<section>
				<van-row>
					<van-col span="8">
						<van-button 
						v-show="loginByPws"
						type="default" 
						class="switch-way"
						tag="a"
						to="/index">忘记密码</van-button>
					</van-col>
					<van-col offset="8" span="8">
						<van-button 
						type="default" 
						class="switch-way"
						tag="a"
						:disabled="switchWayBtnDisabled"
						@click="changeLoginWay">{{loginByPws?'验证码登录':'密码登录'}}</van-button>
					</van-col>
				</van-row>
			</section>
		</div>
		<div class="layout-footer"></div>
		<van-loading v-show="showLoading" type="spinner" :color="themePriamryColor" />
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import logoImg from '@/assets/images/logo_login.png'
	import { Image, Row, Col, Field, CellGroup, Button, Toast, Loading } from 'vant';
	// import { PHONE_NUMBER_REG, LOGIN_VERIFY_CODE_REG, EMPTY_REG } from '@/libs/regexp'
	import { PHONE_NUMBER_REG, LOGIN_VERIFY_CODE_REG } from '@/libs/regexp'
	import { accountLogin, captchaLogin } from '@/api/base'
	import commonMixin from '@/libs/mixins/common.js';
	import { THEME_PRIMARY, THEME_LIGHT_BLUE } from '@/libs/constant.js';

	const COMPONENT_NAME = 'login-captcha'

	export default {
		name: COMPONENT_NAME,
		components: {
			[Image.name]: Image,
			[Row.name]: Row,
			[Col.name]: Col,
			[Field.name]: Field,
			[CellGroup.name]: CellGroup,
			[Button.name]: Button,
			[Toast.name]: Toast,
			[Loading.name]: Loading
		},
		mixins:[commonMixin],
		props:{},
		data(){
			return{
				logoImg,//logo图片
				themePriamryColor:THEME_PRIMARY,//主题色
				themeLightColor:THEME_LIGHT_BLUE,//浅主题色
				loginByPws:false,//是否为密码登录
				pwsRightIcon:'closed-eye',//密码登录右图标
				pwsShowType:'password',//是否显示明文密码
				computedTime:0,//校验码倒计时
				codeBtnIsDisabled:true,//校验码按钮是否为禁用状态
				telFieldDisabled:false,//手机号码输入框是否为禁用状态
				switchWayBtnDisabled:false,//登录方式切换按钮是否为禁用状态
				userInfo: null, //获取到的用户信息
				showLoading:false,//显示正在加载中
				loginBtnDisabled:false,//禁用登录按钮
				formItem:{
					account:'',
					captcha:'',
					password:''
				},//表单项
				validatorObj:{
					errMsg:{
						account:'',
						captcha:'',
						password:''
					}
				}//表单校验
			}
		},
		computed: {
			// 登录按钮的样式
			loginBtnStyle(){
				return {
					background: `linear-gradient( to right,${this.themeLightColor}, ${this.themePriamryColor})`,
					color:'#ffffff'
				}
			},
			//判断手机号码
			isValidTel(){
				return PHONE_NUMBER_REG.test(this.formItem.account);
			}
		},
		watch: {
			loginByPws(n,o){
				if(n==!o){
					for(let k in this.formItem){
						this.formItem[k]=''
					}
					this.codeBtnIsDisabled=true;
				}
			}
		},
		created () {},
		mounted () {},
		methods: {
			...mapMutations([
				'RECORD_USERINFO'
			]),
			async loginBtnClickEvt(){
				for(let k in this.validatorObj.errMsg){
					this.validatorObj.errMsg[k]=""
				}
				this.showLoading=true;
				this.loginBtnDisabled=true;
				// 根据loginByPws判断登录方式
				if(this.loginByPws){
					// 判断电话号码是否有效
					if(!this.isValidTel){
						this.validatorObj.errMsg.account=!this.formItem.account?"请输入手机号":"手机号码格式不正确";
						return;
					}else if(!this.formItem.password){
						this.validatorObj.errMsg.password="请输入登录密码";
						return;
					}else{
						// 登录
						await accountLogin(this.formItem.account, this.formItem.password).then((res)=>{
							this.userInfo=res.data.data;
						}).catch(err=>{
							this.userInfo={
								user_id:this.formItem.account,
								name:'小明',
								profileImg:"http://img4.imgtn.bdimg.com/it/u=2476436593,434837001&fm=26&gp=0.jpg",
								balanceCoin:36,
								shoppingList:[{
									name:"接口错误辅导班",
									status:1
								}],
								errInfo:err
							}
						});
					}
				}else{
					// 判断电话号码是否有效
					if(!this.isValidTel){
						this.validatorObj.errMsg.account=!this.formItem.account?"请输入手机号":"手机号码格式不正确";
						return;
					}else if(!LOGIN_VERIFY_CODE_REG.test(this.formItem.captcha)){
						this.validatorObj.errMsg.captcha="请输入正确的6位数校验码";
						return;
					}else{
						// 登录
						await captchaLogin(this.formItem.account, this.formItem.captcha).then((res)=>{
							this.userInfo=res.data.data;
						}).catch(err=>{
							this.userInfo={
								user_id:this.formItem.account,
								name:'明明',
								profileImg:"http://img4.imgtn.bdimg.com/it/u=2476436593,434837001&fm=26&gp=0.jpg",
								balanceCoin:36,
								shoppingList:[{
									name:"接口错误辅导班",
									status:1
								}],
								errInfo:err
							}
						});
					}
				}
				this.showLoading=false;
				if(this.userInfo.user_id){
					this.RECORD_USERINFO(this.userInfo);
					this.routerJumpEvtMixin({name:'me'})
				}else{
					Toast.fail('登录失败');
				}
				this.loginBtnDisabled=false;
			},
			// 改变登录方式
			changeLoginWay(){
				this.loginByPws=!this.loginByPws;
			},
			// 切换密码的显示状态
			togglePws(){
				let that=this;
				if(that.pwsShowType==='password'){
					this.pwsRightIcon='eye-o';
					this.pwsShowType='text'
				}else{
					this.pwsRightIcon='closed-eye';
					this.pwsShowType='password'
				}
			},
			// 手机号码输入事件
			telInputEvt(val){
				if(/^[1][0-9]{10}$/.test(val)){
					this.codeBtnIsDisabled=false;
				}else{
					this.codeBtnIsDisabled=true;
				}
			},
			// 获取短信验证码
			async getCaptchaMsg(){
				// 手机号是否有效
				if(this.isValidTel){
					this.computedTime = 45;
					this.captchaTimer=setInterval(()=>{
						this.computedTime--;
						if(this.computedTime===0){
							clearInterval(this.captchaTimer)
							// 恢复获取校验码按钮、手机号码输入框、登录方式切换按钮
							this.codeBtnIsDisabled=false;
							this.telFieldDisabled=false;
							this.switchWayBtnDisabled=false;
						}
					},1000);

					// 禁用获取校验码按钮、手机号码输入框、登录方式切换按钮
					this.codeBtnIsDisabled=true;
					this.telFieldDisabled=true;
					this.switchWayBtnDisabled=true;
				}else{
					Toast('请输入正确的手机号码');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.layout-content{
		margin-top:300px;
		padding:0 90px;

		.login-form{

			.cell-group{
				margin:110px 0;

				.code-btn{
					padding:0 40px;
				}

				.cell-field{
					border-bottom:4px solid $color-border-three;
					padding-top:20px;
					padding-bottom:20px;
					font-size:40px;

					.uficon{
						width:1.5em;
						height:1.5em;
					}

					&:not(:first-child){
						margin-top:30px;
					}
				}
			}

		}

		.switch-way{
			color:$color-light-text;
			border:none;

			&:active::before{opacity:0}
		}
	}
</style>