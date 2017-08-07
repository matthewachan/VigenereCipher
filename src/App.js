import React, { Component } from 'react';
import './logo.svg'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Construct an alphabet array
    this.alphabet = [];
    for (let i = 65; i < 91; ++i) {
      this.alphabet.push(String.fromCharCode(i));
    }

    // Component state
    this.state = {
      keyword: [],
      keywordCounter: 0,
      sourceText: '',
      cipherText: '',
      cipher: []
    };

    /**
     * Creates a cipher array
     * @param  {int} offset The number of letters to offset the alphabet by
     * @return {Array}        An array containing the cipher
     */
    this.getCipher = (offset) => {
      let cipher = this.alphabet.slice(); // Copy alphabet array by value
      let front = cipher.splice(0, offset);
      console.log(front)
      cipher.push(...front);
      return cipher;
    }

    /**
     * Return the ciphertext for a given letter
     * @param  {char} letter The letter to encode
     * @return {char}        The encoded letter
     */
    this.getCipherLetter = (letter) => {
      let letterCode = letter.charCodeAt('0') % 65;
      let offset = this.getOffset();
      letterCode = (letterCode + offset) % 26;
      return String.fromCharCode(letterCode + 65);
    }

    /**
     * Return the number of letters to offset the alphabet by
     * @return {int} Number of letters to offset the alphabet by
     */
    this.getOffset = () => {
      // Prevent out of bounds errors
      if (this.state.keyword.length > 0 && this.state.keywordCounter < this.state.keyword.length)
        return this.state.keyword[this.state.keywordCounter].charCodeAt('0') - 65
      return 0;
    }

    /** Update the state when a new keyword is entered */
    this.updateKeyword = () => {
      // Simple input validation
      if (!/^[a-zA-Z]*$/.test(this.input.value)) {
        alert('Invalid input-- please enter a string.');
        return;
      }

      this.setState({
        ...this.state,
        keyword: this.input.value.toUpperCase().split(''),
        keywordCounter : 0,
        sourceText: '',
        cipherText: ''
      });
    }

    /**
     * Update the state when a source letter button is clicked
     * @param  {char} letter Letter that was clicked on
     */
    this.updateSourceText = (letter) => {
      this.setState({
        ...this.state,
        keywordCounter: (this.state.keywordCounter + 1) % this.state.keyword.length,
        sourceText: this.state.sourceText + letter,
        cipherText: this.state.cipherText + this.getCipherLetter(letter)
      });
    }

    this.updateKeyword.bind(this);
    this.updateSourceText.bind(this);
    this.getOffset.bind(this);
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col mt-3 mb-3'>
            <h1 className='text-muted mb-3'><u>Configuration</u></h1>
            <h3>Keyword</h3>
            <div className='input-group'>
              <input className='form-control' ref={node => this.input = node} type='text' placeholder='Enter keyword here...' />
              <span className='input-group-btn'>
                <button className='btn btn-secondary' onClick={this.updateKeyword}>Update</button>
              </span>
            </div>
            <table className='table table-bordered table-responsive mt-2'>
              <tbody>
                <tr>
                  { this.state.keyword.map((letter, index) => <td key={index} className={index === this.state.keywordCounter ? 'table-info' : ''}>{letter}</td>)}
                </tr>
                <tr>
                  { this.state.keyword.map((letter, index) => <td key={index} className={index === this.state.keywordCounter ? 'table-info' : ''}>{letter.charCodeAt('0') - 65}</td>) }
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h1 className='text-muted mb-3'><u>Encoding</u></h1>
            <h3>Source Text</h3>
            <table className='table table-bordered table-responsive'>
              <tbody>
                <tr>
                  { this.alphabet.map((letter, index) => <td key={index}><button className='btn btn-secondary' onClick={() => this.updateSourceText(letter)}>{letter}</button></td>) }
                </tr>
                <tr>
                  { this.getCipher(this.getOffset()).map((letter, index) => <td key={index}>{letter}</td>) }
                </tr>
              </tbody>
            </table>
            <div className='input-group'>
              <input className='form-control' type='text' name='source_text' value={this.state.sourceText} disabled />
              <span className='input-group-btn'>
                <button className='btn btn-secondary' onClick={() => {this.setState({...this.state, sourceText: '', cipherText: ''})}}>Clear</button>
              </span>
            </div>
            <h3 className='mt-3'>Cipher Text</h3>
            <div className='input-group'>
              <input className='form-control' type='text' name='cipher_text' value={this.state.cipherText} disabled />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;