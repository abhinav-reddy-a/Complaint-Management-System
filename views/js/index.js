function filterByDept(){
    var data = document.getElementsByClassName('data');
    var dept = document.getElementsByClassName('dept');
    var deptName = document.getElementById('filterByDeptName').value;

    for(var i=0;i<data.length;i++){
        if(deptName == 'none'){
           data[i].style.display = '';
        }else{
            if(dept[i].innerHTML != deptName){
                data[i].style.display = 'none';
            }else{
                data[i].style.display = '';
            }
        }
    }
}

function search(){
    var data = document.getElementsByClassName('data');
    var search = document.getElementById('search').value;
    var subject = document.getElementsByClassName('subject');
    for(var i=0;i<subject.length;i++){
        if(subject[i].innerHTML.indexOf(search) != -1){
            data[i].style.display = '';
        }else{
            data[i].style.display = 'none';
        }
    }
}

function setDate(){
    var date = document.getElementById('date');
    var d = new Date();
    date.value = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}

function changeRating(n){
    var num = Number(n);
    var stars = document.getElementsByClassName('fa');
    document.getElementById('stars').value = num;
    for(var i=0;i<5;i++){
        if(i<num)
        stars[i].className = 'fa fa-star checked';
        else
        stars[i].className = 'fa fa-star';
    }
}

function clickRow(id){
    window.location = '/complaint/?id='+id+'#bottom';
}

function clickRowHistory(id){
            var role = document.getElementById('role').innerHTML;
            var uri = '';
            if(role!='general')
            uri = '/' + role;
            uri += '/complaint/?id=' + id+'#bottom';
            window.location = uri;
        }