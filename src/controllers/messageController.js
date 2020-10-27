import Message from '../models/message';

export const createContact = (req,res,next)=>{
    Message.create(req.body)
     .then((contact) => {
        console.log('Message sent ', contact);
        res.statusCode = 200;
        res.json(contact);
    }, (err) => next(err))
    .catch((err) => next(err));
 }
  //  SELECT ALL MESSAGES BY ID
 export const readAllContacts = (req, res, next) =>{
    Message.find ({})
    .then((contact) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    }, (err) => next(err))
    .catch((err) => next(err));
 }
  //  SELECT ONE CONTACT MESSAGE BY ID
 export const readOneContact= (req, res, next) =>{
    const {id}=req.params;
    Message.findById(id)
    .then((contact) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    }, (err) => next(err))
    .catch((err) => next(err));
 }
 // DELETING A CONTACT
 export const deleteContact= async (req, res, next) => {
     let { id } = req.params;
         const existMessages = await Message.find({ _id: id });
        if (existMessages.length) {
        try {
            const deletedContact = await Message.deleteOne({ _id: id });
            res.status(200).send(`Meassage is deleted ${existMessages}`);
         
         }
        catch (error) {
            res.status(500).json({error: "not deleted"});
        };
         }
        else { res.status(404).json({ status: 403, error: 'Message Id does not exist' });
        };
 }
