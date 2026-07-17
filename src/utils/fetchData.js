export const getReviews = async () => {
    const response=await fetch(`/api/user/reviews`);
    if(response.status!=200)
        return [];
    const res=await response.json();
    console.log(res);
    return res.data;
}