<template>
<div>
    <form onsubmit="return false;">
      <div class="field has-addons">
        <div class="control">
          <input
          class="input"
          :disabled="disabled"
          @keyup='changeText'
          v-model='textVal'
          type="search"
          :name="name"
          placeholder="代码/名称/拼音"
          required="required"
          :autofocus="autofocus">
          <div>
            <ul v-on-clickaway="away" v-if="suggestionsIsVisible && showSuggestions" class="select_suggestions">
                <li @click="selectedAction(index)" v-for="(item, index) in similiarData">
                  <div>
                    <span v-for="(e, i) in item " class="search_element" v-if="i==1 || i==2 || i==3">
                    {{e}}
                    </span>
                  </div>
                </li>
            </ul>
         </div>
        </div>
        <div class="control">
          <a class="button is-primary" @click="emitClickButton" type="submit">搜索</a>
        </div>
      </div>
    </form>
</div>
</template>
<script>
  import { mixin as clickaway } from 'vue-clickaway'
  export default {
    name: 'search',
    mixins: [ clickaway ],
    props: {
      'value': {
        type: String,
        required: true
      },
      'suggestions': {
        type: Array,
        required: true
      },
      'suggestionAttribute': {
        type: String,
        required: true
      },
      'placeholder': {
        type: String,
        default: 'write something...'
      },
      'minMatch': {
        type: Number,
        default: 1
      },
      'name': {
        type: String,
        default: 'search'
      },
      'autofocus': {
        type: Boolean,
        default: true
      },
      'disabled': {
        type: Boolean
      },
      'showAutocomplete': {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        selectedEvent: null,
        selectedSuggest: null,
        inputChanged: false,
        suggestionsIsVisible: true,
        highlightedIndex: 0,
        highlightedIndexMax: 1000,
        similiarData: [],
        placeholderVal: this.placeholder,
      }
    },
    watch: {
      placeholder: function (val) {
        if (this.textValIsEmpty()) {
          this.placeholderVal = val
        }
      }
    },
    computed: {
      getPlaceholder () {
        if (this.inputChanged || this.textValIsEmpty()) {
          return this.placeholderVal
        }
      },
      modeIsFull () {
        return this.showAutocomplete
      },
      showSuggestions () {
        return this.similiarData.length >= this.minMatch
      },
      textVal: {
        get () {
          return this.value
        },
        set (v) {
          this.$emit('input', v)
        }
      }
    },
    methods: {
      decrementHighlightedIndex () {
        this.highlightedIndex -= 1
      },
      incrementHighlightedIndex () {
        this.highlightedIndex += 1
      },
      escapeAction () {
        this.clearHighlightedIndex()
        this.clearSimilarData()
        this.clearSelected()
        this.setBlur()
        this.emitEscape()
      },
      arrowRightAction () {
        this.setPlaceholderAndTextVal()
        this.emitKeyRight()
      },
      arrowDownAction () {
        if (this.arrowDownValidation()) {
          this.incrementHighlightedIndex()
          this.setPlaceholderAndTextVal()
          this.emitKeyDown()
        } else {
          this.clearHighlightedIndex()
        }
      },
      arrowUpAction () {
        if (this.highlightedIndex > 0) {
          this.decrementHighlightedIndex()
          this.setPlaceholderAndTextVal()
          this.emitKeyUp()
        } else {
          this.clearHighlightedIndex()
        }
      },
      enterAction () {
        this.setFinalTextValue()
        this.clearHighlightedIndex()
        this.clearSimilarData()
        this.emitEnter()
      },
      selectedAction (index) {
        this.highlightedIndex = index
        this.setFinalTextValue()
        this.clearPlaceholder()
        this.clearSimilarData()
        this.emitSelected()
      },
      addRegister (o) {
          this.addSuggestion(o)
      },
      addSuggestion (o) {
          this.addToSimilarData(o)
      },
      addToSimilarData (o) {
        if (this.canAddToSimilarData()) {
          //this.placeholderVal = this.letterProcess(o)
          this.selectedSuggest = o
          this.emitSelected()
          this.similiarData.unshift(o)
        }
      },
      setTextValue (e) {
        if (e.target.value.trim()) {
          this.textVal = e.target.value
          this.emitChange()
        }
      },
      setSelectedAsTextValue () {
        this.textVal = this.selected
      },
      setInitialTextValue () {
        this.textVal = this.value
      },
      setFinalTextValue () {
        console.log("simon1");
        if (this.finalTextValueValidation()) {
          this.setPlaceholderAndTextVal()
          this.emitChange()
        } else {
          this.clearAll()
        }
      },
      setPlaceholderAndTextVal () {
        if (typeof this.similiarData[this.highlightedIndex] !== 'undefined') {
          console.log("simon3");
          var suggest = this.similiarData[this.highlightedIndex]
          this.placeholderVal = suggest[this.suggestionAttribute]
          this.textVal = suggest[this.suggestionAttribute]
          this.selectedSuggest = suggest
          this.emitSelected()
        }
      },
      setInitialPlaceholder () {
        this.placeholderVal = this.placeholder
      },
      setBlur () {
        this.$el.blur()
      },
      getClassHighlighted (index) {
        if (this.highlightedIndex === index) {
          var type = this.getType()
          return type.highlighClass
        }
      },
      letterProcess (o) {
        var remoteText = o[this.suggestionAttribute].split('')
        var inputText = this.textVal.split('')
        inputText.forEach(function (letter, key) {
          if (letter !== remoteText[key]) {
            remoteText[key] = letter
          }
        })
        return remoteText.join('')
      },
      findSuggests () {
        if (this.suggestionsPropIsDefined()) {
          console.log("simon3");
          this.suggestions.forEach(this.addRegister)
        }
      },
      arrowDownValidation () {
        return this.highlightedIndex < this.highlightedIndexMax &&
               this.highlightedIndex < (this.similiarData.length - 1)
      },
      lowerFirst (string) {
        return string.charAt(0).toLowerCase() + string.slice(1)
      },
      controlEvents () {
        var uncaptz = this.lowerFirst(this.selectedEvent + 'Action')
        var fnName = (this[uncaptz])
        if (this.fnExists(fnName)) {
          fnName()
        }
      },
      findRepited (similarItem, o) {
        return (similarItem[this.suggestionAttribute] ===
        o[this.suggestionAttribute])
      },
      findSuggestionTextIsRepited (o) {
        return this.similiarData.find(this.findRepited.bind(this, o))
      },
      finalTextValueValidation () {
        console.log("simon2 " + this.highlightedIndex);
        console.log(typeof this.similiarData[this.highlightedIndex]);
        return typeof this.similiarData[this.highlightedIndex] !== 'undefined' ||
            this.placeholderVal === '' && this.highlightedIndex !== 0
      },
      isSimilar (o) {
        if (o) {
          return o[this.suggestionAttribute]
                  .toLowerCase()
                  .startsWith(this.textVal.toLowerCase())
        }
      },
      fnExists (fnName) {
        return typeof fnName === 'function'
      },
      canAddToSimilarData () {
        return this.similiarData.length < this.highlightedIndexMax
      },
      suggestionsPropIsDefined () {
        return typeof this.suggestions !== 'undefined'
      },
      notArrowKeysEvent () {
        return this.selectedEvent !== 'ArrowUp' &&
                this.selectedEvent !== 'ArrowDown' && this.selectedEvent !== 'ArrowRight'
      },
      notEnterKeyEvent () {
        return this.selectedEvent !== 'Enter'
      },
      textValIsEmpty () {
        return this.textVal === ''
      },
      textValIsNotEmpty () {
        return this.textVal !== ''
      },
      reset () {
        this.clearValue()
        this.clearSelected()
        this.clearPlaceholder()
        this.clearSimilarData()
        this.clearSelectedSuggest()
        this.emitClear()
        this.emitSelected()
      },
      clearAll () {
        this.clearSelected()
        this.clearPlaceholder()
        this.clearSimilarData()
        this.clearSelectedSuggest()
      },
      clearValue () {
        this.textVal = ''
      },
      clearSelected () {
        this.selected = null
      },
      clearSelectedSuggest () {
        this.selectedSuggest = null
      },
      clearSimilarData () {
        this.similiarData = []
      },
      clearPlaceholder () {
        if (this.textValIsEmpty()) {
          this.clearSimilarData()
          this.setInitialPlaceholder()
        } else {
          this.placeholderVal = ''
        }
      },
      clearHighlightedIndex () {
        this.highlightedIndex = 0
      },
      changeText (e) {
        this.selectedEvent = e.code
        this.setTextValue(e)
        this.processChangeText()
        this.controlEvents(e)
      },
      processChangeText (e) {
        if (this.notEnterKeyEvent()) {
          this.inputChanged = true
          this.suggestionsIsVisible = true
          this.clearAllAndFindSuggest()
        }
      },
      clearAllAndFindSuggest () {
        if (this.notArrowKeysEvent()) {
          this.clearAll()
          this.findSuggests()
        }
      },
      away () {
        this.suggestionsIsVisible = false
        this.emitSelected()
      },
      emitChange () {
        this.$emit('input', this.textVal)
      },
      emitClickInput (event) {
        this.$emit('click-input', event)
      },
      emitClickButton (event) {
        this.$emit('click-button', this.textVal)
      },
      emitEnter () {
        this.$emit('enter')
      },
      emitKeyUp () {
        this.$emit('key-up')
      },
      emitKeyDown () {
        this.$emit('key-down', this.selectedSuggest)
      },
      emitKeyRight () {
        this.$emit('key-right')
      },
      emitClear () {
        this.$emit('clear')
      },
      emitEscape () {
        this.$emit('escape')
      },
      emitSelected () {
        console.log("simon4");
        this.$emit('selected', this.selectedSuggest)
      }
    }
}

</script>

<style>
.select_suggestions {
     position: absolute;
     left: 0;
     top: 100%;
     margin: 0;
     background-color: #fff;
     border: 1px solid #D3DCE6;
     width: 100%;
     padding: 6px 0;
     z-index: 10;
     border-radius: 2px;
     max-height: 280px;
     box-sizing: border-box;
     overflow: auto;
     box-shadow: 0 0 6px 0 rgba(0,0,0,.04), 0 2px 4px 0 rgba(0,0,0,.12);
     margin-top:3px;
 }
 .search_element {
   min-width: 80px;
   display: block;
   float: left;
 }
</style>
