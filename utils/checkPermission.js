import { UnauthenticatedError } from "../errors/index.js";

const checkPermission = (requestUserId, resourseUserId) => {
    if (requestUserId === resourseUserId.toString()) return;
    throw new UnauthenticatedError("You are not autherised");
};

export default checkPermission;
