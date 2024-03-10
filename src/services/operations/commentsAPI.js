import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { commentsEndpoints } from "../apis"

const {
    CREATE_COMMENT_API , 
    GET_COMMENT_BY_ID_API ,
    GET_ALL_COMMENTS_FOR_POST_API ,
    UPDATE_COMMENT_BY_ID_API ,
    DELETE_COMMENT_BY_ID_API ,
} = commentsEndpoints


export const createComment = async(data , token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("POST", CREATE_COMMENT_API, {
            data,
        },
        {
            Authorisation: `Bearer ${token}`,
        }
        )
        console.log("CREATE_COMMENT_API API RESPONSE............", response)

        if (!response.data.success) {
        throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("CREATE_COMMENT_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}


export const getCommentById = async(commentId  , token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("GET", GET_COMMENT_BY_ID_API, {
            commentId,
        },
        {
            Authorisation: `Bearer ${token}`,
        }
        )
        console.log("GET_COMMENT_BY_ID_API API RESPONSE............", response)

        if (!response.data.success) {
        throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("GET_COMMENT_BY_ID_API API ERROR............", error)
        result = error.response.data
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}


export const getAllCommentsForPost = async (postId , token) => {               //check again
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_COMMENTS_FOR_POST_API ,{
            postId
        },{
        Authorisation: `Bearer ${token}`,
        })
        console.log("GET_ALL_COMMENTS_FOR_POST_API API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not GET all comments for post")
        }
        toast.success("All comments for post successfull")
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_COMMENTS_FOR_POST API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const updateCommentById = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT", UPDATE_COMMENT_BY_ID_API, data, {
        Authorisation: `Bearer ${token}`,
        })
        console.log("UPDATE COMMENT BY ID API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Update COMMENT")
        }
        toast.success("Comment Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE COMMENT BY ID API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const deleteCommentById = async (data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_COMMENT_BY_ID_API, data, {
        Authorisation: `Bearer ${token}`,
        })
        console.log("DELETE COMMENT BY ID API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Delete COMMENT")
        }
        toast.success("COMMENT Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE COMMENT BY ID API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}