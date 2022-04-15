
module.exports.home = function(request, response){
    console.log(request.cookies);
    return response.render('home',{});
}