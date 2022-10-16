import dayjs from "dayjs"
const url = 'https://www.sfcinemacity.com'
const todayDate = dayjs().format('DD MMM YYYY')
const nowTime = dayjs().format('HH:mm')
const expectTime = dayjs().add(3, 'hours').format('HH:mm')
const nameMovie = 'Faces of Anne'
const locationMovie = 'SF CINEMA Robinson Lifestyle Prachinburi'

describe('Check Time Movie', () => {
    it('Go to url', () => {
       cy.visit(url)
    })

    it('Enter site', () => {
        if(cy.get('[class="cover-page"]')) {
            cy.get('[class="cover-page"]')
                .contains('เข้าสู่เว็บไซต์')
                .click('bottom')
        }
        else {
            cy.get('[class="ajs-dialog"]')
                .contains('ACKNOWLEDGE')
                .click('bottom', { force: true })
        }
    })

    it('Change language', () => {
        cy.get('[class="lang-switcher"]>li').each($el => {
            if ($el.get(0).innerText === 'ENG') {
                cy.wrap($el).click()
            }
        })
       // เพื่อความชัวร์เช็คอีกทีสิ ว่ามันเปลี่ยนภาษาจริงรึเปล่า 
        cy.get('[class="top-navigation"]').contains('Login/Sign up')
        
    })

    it('Select Cinema', () => {
        cy.get('[class="button dropdown-button"]')
          .contains('Select Cinema')
          .click()
        cy.contains(locationMovie)
          .click()
    })
    
    it('Select Movie', () => {
        cy.get('[class="button dropdown-button"]')
        .contains('All Movie')
        .click()
        cy.get('h3[class="name"]')
        .contains(nameMovie)
        .click()
        cy.get('[class="button showtime-button"]')
        .contains('Showtime')
        .click()
    })

    it('Check Date Movie', () => {
        cy.get('[class="selected"]>p')
        .contains(todayDate)
    })

    it('Check Time Movie', () => {
        cy.get('[class="time-list"]>li').each($list => {
            if($list.get(0).innerText >= nowTime && $list.get(0).innerText <= expectTime) {
                cy.wrap($list.children()).click()
                return false
            }
        })
    })

    it('Check Page Change', () => {
        cy.contains('Selected Seat')
    })
})



