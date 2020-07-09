const { json } = require("express")

var data = [] 

module.exports = class Counts {


    //returns the number of occurrences of a word from a text
	async getFreq(text) {
        try {
            var myArr = text.Text
            var newArr = myArr.split(" ")

            //filters the words from the array
            const result = newArr.filter(frequency => frequency == text.Word);
            data[0] = result.length
            return result.length

        } catch (error) {
            throw error
        }
    }

    async getData(){
        try {
            return data 
        } catch (error) {
            throw error
        }
     

    }

    
}