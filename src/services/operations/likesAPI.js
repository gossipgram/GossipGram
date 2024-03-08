import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { likesEndpoints } from "../apis"

const {
    LIKE_POST_API ,
    UNLIKE_POST_API ,
    GET_LIKES_FOR_POST_API
} = likesEndpoints

export const likePost = async(postId , token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("POST", LIKE_POST_API, {
            postId,
        },
        {
            Authorisation: `Bearer ${token}`,
        }
        )
        console.log("LIKE_POST_API API RESPONSE............", response)

        if (!response.data.success) {
        throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("LIKE_POST_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}


export const unlikePost = async(postId , token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("DELETE", UNLIKE_POST_API, {
            postId,
        },
        {
            Authorisation: `Bearer ${token}`,
        }
        )
        console.log("UNLIKE_POST_API API RESPONSE............", response)

        if (!response.data.success) {
        throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("UNLIKE_POST_API API ERROR............", error)
        result = error.response.data
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}


export const getLikesForPost = async (token) => {               //check again
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_LIKES_FOR_POST_API ,{
        Authorisation: `Bearer ${token}`,
        })
        console.log("GET_LIKES_FOR_POST API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not GET likes for post")
        }
        toast.success("likes for a post duccessfull")
        result = response?.data?.data
    } catch (error) {
        console.log("GET_LIKES_FOR_POST API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}