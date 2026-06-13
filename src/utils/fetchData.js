export const getReviews = async () => {
    const response=await fetch(import.meta.env.REACT_APP_ENV_URL+`/api/user/reviews`);
    if(response.status!=200)
        return [];
    const res=await response.json();
    console.log(res);
    return res.data;
}