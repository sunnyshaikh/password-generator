// selectors
const sliderEle = document.getElementById('password-length')

const formEle = document.getElementById('form')

const inputEle = document.getElementById('input-password')
const copyEle = document.getElementById('copy-to-clipboard')

const passLengthEle = document.getElementById('password-length')
const upperCaseEle = document.getElementById('check-ucase')
const lowerCaseEle = document.getElementById('check-lcase')
const numberEle = document.getElementById('check-number')
const symbolEle = document.getElementById('check-symbol')

const LOWERCASE_STRING = getCharactersString(97, 122)
const UPPERCASE_STRING = getCharactersString(65, 90)
const NUMBER_STRING = getCharactersString(48, 57)
const SYMBOL_STRING = `!@#$%^&*()_-+={[}]|\:;"'<,>.?/`

// display length onload and on range input
window.addEventListener('DOMContentLoaded', displayLength)
sliderEle.addEventListener('input', displayLength)


function displayLength() {
  document.getElementById('display-length').innerText = sliderEle.value;
}

// action on form submit
formEle.addEventListener('submit', e => {
  e.preventDefault()

  let passwordLength = passLengthEle.value
  let checkedUppercase = upperCaseEle.checked
  let checkedLowercase = lowerCaseEle.checked
  let checkedNumber = numberEle.checked
  let checkedSymbol = symbolEle.checked

  let finalPassword = generatePassword(passwordLength, checkedUppercase, checkedLowercase, checkedNumber, checkedSymbol)

  inputEle.value = finalPassword

})

// get characters string
function getCharactersString(low, high) {
  let string = '';
  for (let i = low; i <= high; i++) {
    string = string.concat(String.fromCharCode(i))
  }

  return string
}

// generate password
function generatePassword(passwordLength, checkedUppercase, checkedLowercase, checkedNumber, checkedSymbol) {
  // show alert if none of the checkboxes is checked
  if (!checkedUppercase && !checkedLowercase && !checkedNumber && !checkedSymbol) {
    alert('Please check atleast one checkbox')
    window.location = '/'
  }

  console.log(checkedUppercase + checkedLowercase + checkedNumber + checkedSymbol)

  let selectedCharacters = ''

  if (checkedUppercase) selectedCharacters = selectedCharacters.concat(UPPERCASE_STRING)
  if (checkedLowercase) selectedCharacters = selectedCharacters.concat(LOWERCASE_STRING)
  if (checkedNumber) selectedCharacters = selectedCharacters.concat(NUMBER_STRING)
  if (checkedSymbol) selectedCharacters = selectedCharacters.concat(SYMBOL_STRING)

  let randomCharacters = ''

  for (let i = 0; i <= passwordLength; i++) {
    randomCharacters = randomCharacters.concat(selectedCharacters.charAt(Math.floor(Math.random() * selectedCharacters.length)))
  }

  return randomCharacters

}

// function copy to clipboard
copyEle.addEventListener('click', () => {
  if (inputEle.value.length != 0) {
    inputEle.select();
    document.execCommand('Copy');
  }
  else
    alert("Password not Generated");
})