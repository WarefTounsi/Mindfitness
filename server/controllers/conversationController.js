const { Types } = require("mongoose");
const conversationModel = require("../schema/conversation");
const asyncHandler = require("express-async-handler");

//Get all conversations
exports.getAll = asyncHandler(async (req, res) => {
     const conversations = await conversationModel.find({
          $or: [
               {
                    createdBy: new Types.ObjectId(req.user?.id),
               },
               {
                    with: new Types.ObjectId(req.user?.id),
               },
          ],
     });
     return res.status(200).json({ data: conversations });
});
exports.getOneWithUser = asyncHandler(async (req, res) => {
     const { id } = req.params;
     const conversation = await conversationModel.findOne({
          $or: [
               {
                    $and: [
                         {
                              createdBy: new Types.ObjectId(id),
                         },
                         {
                              with: new Types.ObjectId(req?.user?.id),
                         },
                    ],
               },
               {
                    $and: [
                         {
                              createdBy: new Types.ObjectId(req?.user?.id),
                         },
                         {
                              with: new Types.ObjectId(id),
                         },
                    ],
               },
          ],
     });

     return res.status(200).json({ data: conversation });
});

//Get One Conversation
exports.getOne = asyncHandler(async (req, res) => {
     const { conversationID } = req.params;
     const conversation = await conversationModel.findOne({
          createdBy: new Types.ObjectId(req?.user?.id),
          id: new Types.ObjectId(conversationID),
     });
     if (!conversation) {
          return res.status(404).json({ message: "Conversation not found " });
     }
     return res.status(200).json({ data: conversation });
});

//Delete Conversation
exports.deleteOne = asyncHandler(async (req, res) => {
     const { conversationID } = req.params;

     const conversation = await conversationModel.findByIdAndDelete(
          new Types.ObjectId(conversationID)
     );
     //Check conversation exist
     if (
          !conversation ||
          conversation?.createdBy?.toString() !== req.user?.id?.toString()
     ) {
          throw new NotFoundError("Conversation not found !");
     }

     await conversationModel.findByIdAndDelete(
          new Types.ObjectId(conversationID)
     );

     return new SuccessMsgResponse("Conversation successfully deleted").send(
          res
     );
});
