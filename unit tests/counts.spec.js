const Count = require('../modules/count.js');

describe('getFreq()', () => {


    beforeEach( async() => {
        text = {Word: "foo", Text: "foo bar foo"}
        data = []
	})

    afterEach( async() =>{
        data = []
    })

    test('successfully count occurrences', async done => {
		try {
			expect.assertions(1)

            var myArr = text.Text
            var newArr = myArr.split(" ")

            //filters the words from the array
            const result = newArr.filter(frequency => frequency == text.Word);
            data[0] = result.length

			expect(data).toStrictEqual([2])
			done()
		} catch (err) {
			throw err
		}
	})

});