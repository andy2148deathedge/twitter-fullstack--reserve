const bcrypt = require('bcryptjs')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // all the email and name of users/admin list here
    const userSeed = [
      { email: 'root@example.com', name: 'Admin', account: 'root' },
      { email: 'user1@example.com', name: 'User1', account: 'user1' },
      { email: 'user2@example.com', name: 'User2', account: 'user2' },
      { email: 'user3@example.com', name: 'User3', account: 'user3' },
      { email: 'user4@example.com', name: 'User4', account: 'user4' },
      { email: 'user5@example.com', name: 'User5', account: 'user5' },
      { email: 'user6@example.com', name: 'User6', account: 'user6' },
      { email: 'user7@example.com', name: 'User7', account: 'user7' },
      { email: 'user8@example.com', name: 'User8', account: 'user8' },
      { email: 'user9@example.com', name: 'User9', account: 'user9' },
      { email: 'user0@example.com', name: 'User0', account: 'user0' }
    ]
    const coverSeed = [
      'https://images.unsplash.com/photo-1533551268962-824e232f7ee1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1498464619740-386503e7e7f5?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
      'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400'
    ]
    // all users/admin use same password, do it once here
    const password = bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null)

    await queryInterface.bulkInsert(
      'Users',
      userSeed.map((user, index) => ({
        id: index * 10 + 1,
        account: user.account,
        email: user.email,
        password: password,
        name: user.name,
        avatar: `https://randomuser.me/api/portraits/men/${index}.jpg`,
        introduction: faker.lorem.sentences().substring(0, 160),
        cover: coverSeed[index],
        role: user.name === 'Admin' ? 'admin' : 'user',
        createdAt: new Date(
          new Date().setDate(new Date().getDate() - 240 + index)
        ),
        updatedAt: new Date(
          new Date().setDate(new Date().getDate() - 240 + index)
        ),
        activeTime: new Date(
          new Date().setDate(new Date().getDate() - 240 + index)
        )
      })),
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
