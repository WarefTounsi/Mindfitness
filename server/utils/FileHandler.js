exports.FileHandler = (req,res,next) => {
    req.body.video = req.files.video[0].filename;
    req.body.image = req.files.image[0].filename;
    req.body.content = [];
    if (typeof(req.body.chaptersTitles) == "string"){
        req.body.chaptersTitles = [req.body.chapterTitles]
        req.body.chaptersDescriptions = [req.body.chaptersDescriptions]
    }
    for (let i = 0; i < req.body.chaptersTitles.length; i++) {
         req.body.content.push({
              chapterTitle: req.body.chaptersTitles[i],
              chapterDescription: req.body.chaptersDescriptions[i],
              file:"http://localhost:8800/"+ req.files.ressources[i].filename,
         });
    }
    next();    
}
