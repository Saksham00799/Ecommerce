class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            },
        } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(){
        const querycopy = {...this.queryStr}

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key)=>delete querycopy[key]);
        
        // Filter for Price and rateings
        console.log(querycopy);

        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`)

        console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this; 
    }

    pagintaion(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }
}


module.exports = ApiFeatures;