/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */

var phoneList = [];
var readLineSync = require("readline-sync");
var fs = require("fs");

phoneList = JSON.parse(fs.readFileSync("data.json"));
const main = () => {
  showMenu();
}

const showContacts = () => {
  for (let i in phoneList) {
    console.log(`${parseInt(i)+1}. Name: ${phoneList[i].name} - Phone: ${phoneList[i].phone}`);
  }
  console.log('==========================================');
}

const createContact = () => {
  const newName = readLineSync.question('Enter name: ');
  const newPhone = readLineSync.question('Enter phone: ');
  const newContact = {
    name: newName,
    phone: newPhone
  }

  console.log(newContact)
  phoneList.push(newContact)

  fs.writeFileSync("data.json", JSON.stringify(phoneList), {endcoding: 'utf8'})

  console.log(`Create new contact finished...`)
}

const editContact = () => {
  showContacts();
  const index = readLineSync.question('Enter the index, you want to edit contact: ');
  const option = readLineSync.question('What do you want to change (Name: N, Phone: P, All: A): ');
  upperOption = option.toUpperCase()
  switch (upperOption) {
    case 'A': {
      const newName = readLineSync.question('Enter new name: ');
      const newPhone = readLineSync.question('Enter new phone: ')

      phoneList[index - 1].name = newName;
      phoneList[index - 1].phone = newPhone;
      break;
    }
    case 'N': {
      const newName = readLineSync.question('Enter new name: ');

      phoneList[index - 1].name = newName;
      break;

    }
    case 'P': {
      const newPhone = readLineSync.question('Enter new phone: ')

      phoneList[index - 1].phone = newPhone;
      break;
    }
    default:
      console.log('Wrong option');
      const ask = readLineSync.question('Do you want to change contact again (Y/N) !');
      upperAsk = ask.toUpperCase();
      if (upperAsk === "Y") editContact();
      else showMenu();
      break;
  }

  fs.writeFileSync("data.json", JSON.stringify(phoneList), { endcoding: 'utf8' });
  console.log('Edit finished...')
}

const findContact = () => {
  const find = readLineSync.question('Enter phone, you want to find: ');
  for (let contact of phoneList) {
    if (contact.phone === find) {
      console.log(`Name: ${contact.name} - Phone: ${contact.phone}`)
      console.log('Find finished...')
      showMenu()
    }
  }
  const ask =readLineSync.question("We don't have your phone. Do you want to create new contact (Y/N)")
  upperAsk = ask.toUpperCase();
  if (upperAsk === "Y") createContact();
  else showMenu();
}

const removeContact = () => {
  showContacts();
  const index = readLineSync.question('Enter index, you want to remove: ');
  const temp = phoneList.splice(parseInt(index) - 1, 1);
  console.log(`You removed contact- Name: ${temp[0].name} - Phone: ${temp[0].phone}`);
  fs.writeFileSync("data.json", JSON.stringify(phoneList), { endcoding: 'utf8' });
  console.log('Remove finished...')
}

const showMenu = () => {
  console.log('**** Menu ****')
  console.log('1. Show all contacts');
  console.log('2. Create contact');
  console.log('3.Edit contact');
  console.log('4.Find contact');
  console.log('5.Remove contact');
  console.log('6.Save and Exit');
  let selected = readLineSync.question("> Enter your option: ");
  switch (selected) {
    case '1':
      {
        showContacts();
        showMenu();
        break;
      }
    case '2':
      {
        createContact();
        showMenu();
        break;
      }
    case '3':
      {
        editContact();
        showMenu();
        break;
      }
    case '4':
      {
        findContact();
        showMenu();
        break;
      }
    case '5':
      {
        removeContact();
        showMenu();
        break;
      }
    case '6':
      {
        console.log(`Thanks for using...`);
        break;
      }
    default:
      {
        console.log('Wrong option, pls choose again !');
        showMenu();
        break;
      }
  }
}

main();