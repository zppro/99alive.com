/**
 * Created by zppro on 17-7-27.
 */
import Vue from 'vue'

const $defaults = {
  REQUIRED: 'required',
  NUMBER: 'number'
}

const rules = [
  {name: $defaults.REQUIRED, msg: `{{field}}不能为空`}
]

const validateField = (value, validator, msg) => {
  let fieldErrors = []
  let ruleNames = Object.keys(validator)
  for(let ruleName of ruleNames) {
    if ($defaults.REQUIRED === ruleName) {
      let rule = rules.find(o => o.name === ruleName)
      if(value === '') {
        fieldErrors.push(msg || (rule && rule.msg.replace(/\{\{field\}\}/gi, validator.name)))
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
          console.log($errors)
          Vue.set(this.validators, '$errors', $errors)
          Vue.set(this.validators, 'test', field => this.validators.$errors[field].trim())
        }
      }
    })
    Vue.prototype.$validate = function (field) {
      if (!this.validators) return true
      if (field) {
        let value = this[field]
        let fieldErrors = validateField(value, this.validators[field], this.validators.$msgs && this.validators.$msgs[field])
        Vue.set(this.validators.$errors, field, fieldErrors.join())
        return fieldErrors.length === 0
      } else {
        let result = true
        for(let field of Object.keys(this.validators)) {
          let value = this[field]
          let fieldErrors = validateField(value, this.validators[field], this.validators.$msgs && this.validators.$msgs[field])
          Vue.set(this.validators.$errors, field, fieldErrors.join())
          result = result && fieldErrors.length === 0
        }
        return result
      }
    }
  }
}



Vue.use(VueValidator)