if(localStorage.getItem('users') === null) {
    localStorage.setItem('users',JSON.stringify([]))
}

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


form.addEventListener('submit', e => {
	e.preventDefault();
	
	let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
	let password2 = document.getElementById('password2').value;
	let error = document.querySelector('.Error')
	let error2 = document.querySelector('.Error2')
    var check = true;
	
    let users = JSON.parse(localStorage.getItem('users'));

	
    for (let user of users) {

        if (username === '') {
            check = false

			
        }
		if(email === '')
		{
          check = false
		  
		}
		if (password === '') {
            check = false

			
        }
		if(password2 === '')
		{
          check = false
		  
		}


        if (user.Email == email) {
            check = false
			setTimeout(() => {
				error2.innerHTML='Email artıq istifadə olunub !';
			    error2.style.color='red';
				error2.classList.remove('d-none')
		
				
			}, 1000);
			setTimeout(() => {
				error2.classList.add('d-none')
			}, 5000);
			
        }
	    if(user.UserName == username)
		{
			setTimeout(() => {
				error.innerHTML='İstifadəçi adı artıq istifadə olunub !';
			    error.style.color='red';
				error.classList.remove('d-none')				  
			}, 1000);
			setTimeout(() => {
				error.classList.add('d-none')
			}, 5000);
			
          check = false
		  
		}
		
    }

     if (check == true) {
		
        users.push({
            UserName:username,
            Email: email,
            Password: password,
			Password2: password2
        
            
        })
        localStorage.setItem('users',JSON.stringify(users))

		checkInputs();
    }
	
});


function checkInputs() {

	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'İstifadəçi adı boş ola bilməz!');
	}
  else if(usernameValue.length < 6)
  {
    setErrorFor(username, 'İstifadəçi adı min 6 simvol olmalıdır!');
  }
   else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email boş ola bilməz!');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Düzgün email daxil Edin!');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Şifrə boş ola bilməz!');
	} 
  else if(passwordValue.length < 8)
  {
    setErrorFor(password, 'Şifrə min 8 simvol olmalıdır!');
  }
  else if(passwordValue === emailValue) {
		setErrorFor(email, 'Email artıq mövcuddur !');
	}
	else if(emailValue === usernameValue) {
		setErrorFor(password, 'İstifadəçi Adı ilə Şifrə Eyni Ola Bilməz !');
	}
  else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Şifrə təkrarı boş ola bilməz!');
	}
  
   else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Birinci daxil etdiyiniz şifrə ilə uyğun deyil!');
	}
  else if(password2Value === usernameValue) {
		setErrorFor(password2, 'İstifadəçi Adı ilə Şifrə Eyni Ola Bilməz !');
	}
   else{
		setSuccessFor(password2);

    setTimeout(() => {
      alert('Qeydiyyat Tamamlandı')
      location.reload();
    }, 1000);

	}
  
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

