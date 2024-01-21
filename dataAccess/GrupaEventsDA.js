import Eveniment from "../entities/Eveniment.js";
import GrupaEvents from "../entities/GrupaEvents.js";
import LikeOp from './Operators.js'

async function getGroups(){
    return await GrupaEvents.findAll({include: ["Evenimente"]});
}

async function getGroupsById(id){
    return await GrupaEvents.findByPk(id, {include: ["Evenimente"]});
}

async function createGroup(group){
    try{
    return await GrupaEvents.create(group, {include:[{model: Eveniment, as: "Evenimente"}]});
    } catch (e){
        if (e.message === "notNull Violation: GrupaEvents.GrupaEventsName cannot be null")
            throw new Error("Nume nul");
        else
            throw e;
    }
}

async function deleteGroup(id){
    let deletElem = await GrupaEvents.findByPk(id);

    if (!deletElem){
        console.log("This element does not exists");
    }

    return await deletElem.destroy();
}


async function getGroupWithFilterAndPagination(filter){
  
    if (!filter.take)
      filter.take = 10;

    if (!filter.skip)
      filter.skip = 1;

    let whereClause = {};
    if (filter.grupaEventsName)
        whereClause.GrupaEventsName = {[LikeOp]: `%${filter.grupaEventsName}%`};
  
    if (filter.grupaEventsClosed)
      whereClause.GrupaEventsClosed = {[LikeOp]: `%${filter.grupaEventsClosed}%`};
  
    let whereIncludeClause = {};

    if (filter.evenimentName)
      whereIncludeClause.EvenimentName = {[LikeOp]: `%${filter.evenimentName}%`};

    if (filter.evenimentDate)
        whereIncludeClause.EvenimentDate = {[LikeOp]: `%${filter.evenimentDate}%`};  
  
    return await GrupaEvents.findAndCountAll (
      {   
        distinct: true,         
        include:
         [
           {
            model: Eveniment,
            as: "Evenimente",
            where: whereIncludeClause
           }
         ],
         where: whereClause,
         limit: parseInt(filter.take),
         offset: parseInt(filter.skip - 1) * parseInt(filter.take), // skip este pagina curenta iar take sunt cate inregistrari vin pe pagina
      });
  }

export {
    getGroupsById,
    getGroups,
    createGroup,
    deleteGroup,
    getGroupWithFilterAndPagination
}