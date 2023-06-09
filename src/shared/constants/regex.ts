export const REGEX = {
  phone: /^(\+7|7|8)?[\s-]?\(?[4789][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  onlyNumbers: /^\d+$/,
  onlyPositiveNumbers: /^[1-9]\d*$/,
  symbols: /[@$!%*#?&.]/,
  date: /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d/g,
  notCyrillic: /^[^аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/,
  name: /^(?=.{1,20}$)([A-Za-zА-Яа-я]+[A-Za-zА-Яа-я\s-]*[A-Za-zА-Яа-я]+)*$/i,
  onlyLatinAndNumbers: /^[A-Za-z0-9]+$/,
  onlyLetters: /^[a-zA-ZА-Яа-я ]*$/,
};
