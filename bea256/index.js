var CryptoJS = require('crypto-js')

class BEA256 {

    constructor(entry, key) {
        this.entry = entry;
        this.key = key;
        this.blocks = []
        this.keepLetters = []
        this.result = ''
    }

    encrypt(encode) {

        this.createBlocks()

        try {
            for (var i = 0; i < this.blocks.length; i++) {
                const key = i === 0 ? this.key : this.key + this.keepLetters[i - 1]
                this.blocks[i] = {
                    id: this.aesEncrypt(this.keepLetters[i], key),
                    previus_id: i === 0 ? this.aesEncrypt('', this.key) : CryptoJS.AES.encrypt(this.blocks[i - 1].letter, this.key).toString()
                }
            }
        } catch {
            throw Error('No entry suitable for the specified encoding was provided.')
        }

        this.result = {
            'base64': Buffer.from(JSON.stringify(this.blocks)).toString('base64'),
            'json': JSON.stringify(this.blocks)
        }

        if (!this.result[encode]) return this.result = this.blocks
        return this.result[encode]
    }

    decrypt(encoded = 'block') {

        this.learnBlocks(encoded)

        try {
            for (var i = 0; i < this.blocks.length; i++) {
                const key = i === 0 ? this.key : this.key + this.keepLetters[i - 1]
                this.blocks[i] = {
                    id: this.aesDecrypt(this.blocks[i].id, key)
                }
                this.keepLetters[i] = this.blocks[i].id
            }
        } catch {
            throw Error('No entry suitable for the specified encoding was provided.')
        }

        for (var i = 0; i < this.keepLetters.length; i++) {
          this.result += this.keepLetters[i]
        }
        return this.result

    }

    createBlocks() {
        this.keepLetters = this.entry.split('')
        for (var i = 0; i < this.keepLetters.length; i++) {
            this.blocks[i] = {
                id: i,
                previus_id: i === 0 ? 0 : i - 1
            }
        }
    }

    learnBlocks(encoded) {
        try {
            if (encoded === 'block') {
                this.blocks = this.entry
            } else if (encoded === 'base64') {
                return this.learnBlocks(JSON.parse(Buffer.from(this.entry, 'base64').toString('utf8')))
            } else if (encoded === 'json') {
                return this.learnBlocks(JSON.parse(this.entry))
            } else {
                this.entry = encoded
                return this.learnBlocks('block')
            }
        } catch {
            throw Error('No entry suitable for the specified encoding was provided.')
        }
    }

    aesEncrypt(message = '', key = '') {
        var message = CryptoJS.AES.encrypt(message, key);
        return message.toString();
    }

    aesDecrypt(message = '', key = '') {
        var code = CryptoJS.AES.decrypt(message, key);
        var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

        return decryptedMessage;
    }

}

module.exports = BEA256
