
class AccountINFO {
    static async getDATA( event ){
        event.preventDefault()
        let name = document.getElementById("name").value
        if ( name === ''){
            alert("fill the field")
        }else{
            try {
                let response = await fetch(`https://api.github.com/users/${ name }`)
                let data = await response.json()
                AccountINFO.accountINFO( data )    
            }catch ( err ){
                alert("enter an valid account name")
            }
        }
    }

    static async accountINFO( data ){
        let name = data.name
        let bio = data.bio
        let profilePIC = data.avatar_url
        let blog = data.blog
        let company = data.company
        let startedAT = data.created_at
        let email = data.email
        let followers = data.followers
        let following = data.following
        let location = data.location
        let loginAS = data.login
        let repos = data.public_repos
        let lastUPDATE = data.updated_at
        let profileURL = data.url
        await AccountINFO.renderACCOUNT ( bio,profilePIC,blog,company,startedAT,email, 
                            followers,following,location,loginAS,name,repos,
                            lastUPDATE,profileURL)
            
    } 
    
    
    static async renderACCOUNT( bio,profilePIC,blog,company,startedAT,email, 
                                followers,following,location,loginAS,name,repos,
                                lastUPDATE,profileURL)
    {
    let last = await Utils.getLocalTime(lastUPDATE)
    let started = await Utils.getLocalTime(startedAT)
    let tb = document.getElementById("tb")
    tb.innerHTML = `<tr>
                        <td>logged in as</td>
                        <td>${ loginAS }</td>
                    </tr>
                    <tr>
                        <td>prefered name</td>
                        <td>${ name }</td>
                    </tr>
                    <tr>
                        <td>profile picture</td>
                        <td><img src="${ profilePIC }" height="100px" alt="profile pic"></td>
                    </tr>
                    <tr>
                        <td>email id</td>
                        <td>${ email }</td>
                    </tr>
                    <tr>
                        <td>bio</td>
                        <td>${ bio }</td>   
                    </tr>
                    <tr>
                        <td>blog</td>
                        <td><a href="${ blog }">${ blog }</a></td>
                    </tr>
                    <tr>
                        <td>company</td>
                        <td>${ company }</td>
                    </tr>
                    <tr>
                        <td>location</td>
                        <td>${ location }</td>
                    </tr>
                    <tr>
                        <td>joined github at</td>
                        <td>${ started }</td>
                    </tr>
                    <tr>
                        <td>no of followers</td>
                        <td>${ followers }</td>
                    </tr>
                    <tr>
                        <td>following</td>
                        <td>${ following }</td>
                    </tr>
                    <tr>
                    <td>no of repositories</td>
                    <td>
                    ${ repos }
                    <button class="btn btn-primary btn-sm ml-5" onclick="Repos.getusersREPO()">
                        <a href="#" class="text-white">
                            visit all repos
                        </a>
                    </button>
                    </td>
                    </tr>
                    <tr>
                    <td>last visited</td>
                    <td>${ last }</td>
                    </tr>
                    <tr>
                    <td>account url</td>
                    <td><a href="${ profileURL }">${ profileURL }</a></td>
                    </tr>`
    }
}


class Repos {
    static async getusersREPO(){
        let name = document.getElementById("name").value
        let response = await fetch(`https://api.github.com/users/${ name }/repos`)
        let data = await response.json()
        for (let i in data){
            let createDATE = data[i].created_at
            let defaultBranch = data[i].default_branch
            let fork = data[i].fork
            let forkCount = data[i].forks_count
            let fullname = data[i].full_name
            let url = data[i].html_url
            let lang = data[i].language
            let license = data[i].license
            let name = data[i].name
            let accPrivate = data[i].private
            let pushedAT = data[i].pushed_at
            let size = data[i].size
            let updatedAT = data[i].updated_at
            let watchCOUNT = data[i].watchers
            await Repos.renderINFO( createDATE, defaultBranch, fork, forkCount, 
                        fullname, url, lang, license, name, accPrivate, 
                        pushedAT, size,updatedAT, watchCOUNT )
            }
    }

    static async renderINFO( createDATE, defaultBranch, fork, forkCount, fullname, url, lang, 
                            license, name, accPrivate, pushedAT, size,updatedAT, watchCOUNT)
        {
        let created = await Utils.getLocalTime( createDATE )
        let updated = await Utils.getLocalTime( updatedAT )
        let publish = await Utils.getLocalTime( pushedAT )
        let fileSize = await Utils.findSIZE( size ) 
        let repos = document.getElementById("repos")
        repos.innerHTML += `<div class="card text-white bg-dark mb-3 border border-white">
                            <div class="card-header border border-white border-bottom">
                                repo name :${name}
                            </div>
                            <div class="card-body">
                                <div class="card-text">
                                <table class="table table-striped table-dark">
                                <tbody>                                
                                <tr>
                                    <td>fullname</td> 
                                    <td>${ fullname }</td>   
                                </tr>
                                <tr>
                                    <td>repo created at</td> 
                                    <td>${ created }</td>   
                                </tr>
                                <tr>
                                    <td> private</td>
                                    <td>${ accPrivate }</td>
                                </tr>
                                <tr>
                                    <td> last updated at </td>
                                    <td>${ updated }</td>
                                </tr>
                                <tr>
                                    <td> default repo branch </td>
                                    <td>${ defaultBranch }</td>
                                </tr>
                                <tr>
                                    <td> language used </td>
                                    <td>${ lang }</td>
                                </tr>
                                <tr>
                                    <td> license </td>
                                    <td>${ license }</td>
                                </tr>
                                <tr>
                                    <td> pushed at </td>
                                    <td>${ publish }</td>
                                </tr>
                                <tr>
                                    <td> repo size </td>
                                    <td>${ fileSize }</td>
                                </tr>
                                <tr>
                                    <td> forked </td>
                                    <td>${ fork }</td>
                                </tr>
                                <tr>
                                    <td> fork count  </td>
                                    <td>${ forkCount }</td>
                                </tr>
                                <tr>
                                    <td> watched </td>
                                    <td>${ watchCOUNT }</td>
                                </tr>
                                <tr>
                                    <td>repo url</td>
                                    <td><a href="${ url }">${ url }</a></td>
                                </tr>
                                </tbody>
                                </table>    
                            </div>
                            </div>
                        </div>`
            Utils.clearINPUT()
    }
}

class Utils {
    static async getLocalTime( time ){
        let t = new Date( time )
        let a = `${t.getDate()}/${t.getMonth()}/${t.getFullYear()}`
        return a
    }

    static async findSIZE( size ){
        if ( size < 1024 ){
            return `${ size }mb`
        }else if ( size > 1000){
            let s = size / 1024
            return `${ s }mb`
        }
    }
    
    static async clearINPUT() {
        document.getElementById("name").value = ''
    }
}

document.getElementById("form").addEventListener("submit",AccountINFO.getDATA)

