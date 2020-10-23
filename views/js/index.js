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