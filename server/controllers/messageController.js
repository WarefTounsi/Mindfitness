const asyncHandler = require("express-async-handler");
const messageModel = require("../schema/message");
const { Types } = require("mongoose");
const conversationModel = require("../schema/conversation");


exports.getAll = asyncHandler(async (req, res) => {
    try {
        const { convID } = req.params;
        const messages = await messageModel.find({ conversation: new Types.ObjectId(convID) });
        return res.status(200).json({data:messages})
    } catch (err) {
        return res.status(400).json({message:err.message})
    }
});

exports.createMsg = asyncHandler(async (req, res) => {
    try {
        console.log(req.user)
        if (req.body.conversation) {
            const conversation = await conversationModel.findById(new Types.ObjectId(req.body.conversation));
            if (!conversation) {
                return res.status(404).json({message:"No conversation found"})
            }
            const message =  await messageModel.create({ ...req.body, createdBy: req?.user?.id, conversation: req?.body.conversation })
            conversation.lastMessage = message?.id;
            await conversation?.save()
            return res.status(200).json({message,conversation});
        }

        const message = await (await messageModel.create({ ...req.body, createdBy: req?.user?.id }))
        const conversation = await (await conversationModel.create({
            createdBy: req?.user?.id,
            lastMessage: message?.id,
            with: req?.body?.with
        })).populate('lastMessage with createdBy')

        message.conversation = conversation?.id;
        await message.save()
        return res.status(200).json({
            data:{
                message,
                conversation
            }
        })
    } catch (err) {
        return res.status(400).json({
            message:err.message
        })
    }
});
exports.update = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const message = await messageModel.findById(id);
        if (message?.from.toString() === req?.user?.id?.toString()) {
            const message = await messageModel.findByIdAndUpdate(id, req.body);
            return res.status(200).json({
                message
            })
        }
        return res.status(400).json({
            message:"Invalid action"
        })
    } catch (err) {
        return res.status(400).json({
            message:err.message
        })
    }
});

exports.deleteMsg = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const message = await messageModel.findById(id);
        if (message?.from.toString() === req?.user?.id?.toString()) {
            const message = await messageModel.findByIdAndDelete(id);
            return res.status(200).json({
                data:message
            })
        }
        return res.status(400).json({
            message:"Invalid action"
        })
    } catch (err) {
        return res.status(200).json({
            message:err.message
        })
    }
});