/**
 * Created by zppro on 17-7-27.
 */
import Vue from 'vue'
import debounce from 'lodash.debounce'
import { isObject, isFunction } from '~/assets/js/utils'

const $defaults = {
  REQUIRED: 'required',
  PATTERN: 'pattern',
  MATCH: 'match',
  PREDICATE: 'predicate',
  NUMBER: 'number'
}

const rules = [
  {name: $defaults.REQUIRED, msg: `{{field}}不能为空`},
  {name: $defaults.PATTERN, msg: `{{field}}不匹配模式`},
  {name: $defaults.NUMBER, msg: `{{field}}必须是数字`},
  {name: $defaults.MATCH, msg: `{{field}}与{{field2}}不一致`},
  {name: $defaults.PREDICATE, msg: `{{field}}失败(predicate)`}
]

const valiatingWhenNotEmpty = v => !!v

const validateField = async function (value, validator, msg) {
  let fieldErrors = []
  let ruleNames = Object.keys(validator)
  for(let ruleName of ruleNames) {
    let rule = rules.find(o => o.name === ruleName)
    let errMsg = msg || (rule && rule.msg.replace(/\{\{field\}\}/gi, validator.name))
    if ($defaults.REQUIRED === ruleName) {
      if (value === '') {
        !fieldErrors.includes(errMsg) && fieldErrors.push(errMsg)
      }
    } else if ($defaults.PATTERN === ruleName) {
      if (!validator[ruleName].test(value)) {
        !fieldErrors.includes(errMsg) && fieldErrors.push(errMsg)
      }
    } else if ($defaults.MATCH === ruleName) {
      let matchValue, useEmpty
      if (isObject(validator[ruleName])) {
        matchValue = this[validator[ruleName].field]
        useEmpty = validator[ruleName].useEmpty
      } else {
        matchValue = this[validator[ruleName]]
        useEmpty = true
      }
      if ((useEmpty || matchValue) && matchValue !== value) {
        !fieldErrors.includes(errMsg) && fieldErrors.push(errMsg)
      }
    } else if ($defaults.PREDICATE === ruleName) {
      const predicator = validator[ruleName]
      // console.log('validateField', value, validator.name)
      if (isFunction(predicator) && !await predicator(value)) { //debounce(predicator, 1000, true)(value) predicator(value)
        !fieldErrors.includes(errMsg) && fieldErrors.push(errMsg)
      }
    }
  }
  return fieldErrors
}

const VueValidator = {
  install: (Vue) => {
    Vue.mixin({
      computed: {
        $errors () {
          return this.validators.$errors
        }
      },
      created () {
        if(this.validators) {
          let $errors = {}
          for(let field of Object.keys(this.validators)) {
            $errors[field] = ' '
          }
          // console.log($errors)
          Vue.set(this.validators, '$errors', $errors)
          // Vue.set(this.validators, 'test', field => !this.validators.$errors[field].trim())
          Vue.set(this.validators, 'success', field => {
            let valiatingWhen = this.validators.$valiatingWhen[field]
            if (!isFunction(valiatingWhen)){
              valiatingWhen = valiatingWhenNotEmpty
            }
            return valiatingWhen(this[field]) && !this.validators.$errors[field].trim()
          })
          Vue.set(this.validators, 'error', field => this.validators.$errors[field].trim())
        }
      }
    })
    Vue.prototype.$validate = debounce(async function (field) {
      if (!this.validators) return true
      // console.log('field:', field, +new Date())
      if (field) {
        let value = this[field]
        let fieldErrors = await this::validateField(value, this.validators[field], this.validators.$msgs && this.validators.$msgs[field])
        Vue.set(this.validators.$errors, field, fieldErrors.join())
        return fieldErrors.length === 0
      } else {
        let result = true
        for(let field of Object.keys(this.validators)) {
          let value = this[field]
          let fieldErrors = await this::validateField(value, this.validators[field], this.validators.$msgs && this.validators.$msgs[field])
          Vue.set(this.validators.$errors, field, fieldErrors.join())
          result = result && fieldErrors.length === 0
        }
        return result
      }
    }, 250)
  }
}



Vue.use(VueValidator)