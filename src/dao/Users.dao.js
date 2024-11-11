// import userModel from './models/User.js';

// export default class Users {
//     get = (params) => {
//         const { limit, skip } = params;
//         return userModel.find()
//             .skip(skip)
//             .limit(limit);
//     };

//     getBy = (params) => {
//         return userModel.findOne(params);
//     };

//     save = (doc) => {
//         return userModel.create(doc);
//     };

//     update = (id, doc) => {
//         return userModel.findByIdAndUpdate(id, { $set: doc });
//     };

//     delete = (id) => {
//         return userModel.findByIdAndDelete(id);
//     };
// }

import userModel from './models/User.js';

export default class Users {
    get = ({ limit = 10, skip = 0 } = {}) => {
        console.log('Método get() llamado con:', { limit, skip });
        return userModel
            .find()
            .skip(skip)
            .limit(limit)
            .then((result) => {
                console.log('Resultado en get():', result);
                return result;
            })
            .catch((error) => {
                console.error('Error en get():', error);
                throw error;
            });
    };

    getBy = (params) => {
        return userModel.findOne(params);
    };

    save = (doc) => {
        return userModel.create(doc);
    };

    update = (id, doc) => {
        return userModel.findByIdAndUpdate(id, { $set: doc });
    };

    delete = (id) => {
        return userModel.findByIdAndDelete(id);
    };
}
