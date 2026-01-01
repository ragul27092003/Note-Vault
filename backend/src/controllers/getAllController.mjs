import Notes from "../models/Notes.mjs"

export async function getAllNotes(req,res){
    try{
        const notes=await Notes.find().sort({createdAt:-1});
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in getting Notes Controller",error)
        res.status(500).json({msg:"Internal server error"})
    }
}
export async function getNote(req,res){
    try{
        const notes=await Notes.findById(req.params.id);
         if(!notes){
            res.status(404).send({msg:"Note Not Found"})
        }
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in getting Note Controller",error)
        res.status(500).json({msg:"Internal server error"})
    }
}
export async function createNote(req,res){
    try{
        const { title, content}=req.body
        const notes=new Notes({title,content});
        const savedNote= await notes.save();
        res.status(201).json(savedNote);
    }
    catch(error){
        console.error("Error in creating Notes Controller",error)
        res.status(500).json({msg:"Internal server error"})
    }
    
}
export async function updateNote(req,res){
     try{
        const { title, content}=req.body
        const notes=await Notes.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!notes){
            res.status(404).send({msg:"Notes Not Found"})
        }
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in updating Notes Controller",error)
        res.status(500).json({msg:"Internal server error"})
    }
}
export async function deleteNote(req,res){
    try{
        const notes=await Notes.findByIdAndDelete(req.params.id)
        if(!notes){
            res.status(404).send({msg:"Notes Not Found"})
        }
        res.status(200).json({msg:"Notes Deleted Successfully"});
    }
    catch(error){
        console.error("Error in updating Notes Controller",error)
        res.status(500).json({msg:"Internal server error"})
    }
}