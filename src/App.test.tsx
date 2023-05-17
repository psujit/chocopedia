import App from './App'
import { render, screen, userEvent } from './test/test-utils.ts'
import { makeServer } from './mirage'
import { Server } from 'miragejs/server'

describe('Chocopedia Tests', () => {
  let server: Server
  const user = userEvent.setup()

  const ensurePortalExists = () => {
    let portalRoot = document.getElementById("modal")
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'modal')
      document.body.appendChild(portalRoot)
    }
  }

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    vi.mock('./components/ViewChocolate/PieChart', () => ({PieChart: () => 'mocked Pie Chart'}))
  })

  afterEach(() => {
    server.db.emptyData()
    server.shutdown()
  })

  it('should not display Chocolate Details on load', async () => {
    render(<App />)
    const EditNameField = screen.queryByPlaceholderText('Name')
    expect(EditNameField).toBe(null)
  })

  it('should display appropriate message when there are no chocolates in the database', () => {
    server.db.emptyData()
    render(<App />)
    screen.getByText('No Chocolates Yet')
  })

  it('should render the chocolates that exist in the database', async () => {
    render(<App />)
    await screen.findAllByText('Sesam')
    await screen.findAllByText('Marzipan')
    await screen.findAllByText('Dark Milk')
    await screen.findAllByText('EXCELLENCE 99%')
  })

  it('should display appropriate records when there is a chocolate found via search', async () => {
    render(<App />)
    await screen.findAllByText('Cacao Pur')
    await screen.findAllByText('EXCELLENCE 99%')
    await screen.findAllByText('Sesam')
    const searchBox = screen.getByPlaceholderText('Search by Name, Brand or Shop Link...')
    await user.type(searchBox, 's')
    expect(screen.queryAllByText('Cacao Pur')).toHaveLength(0)
    expect(screen.queryAllByText('EXCELLENCE 99%')).toHaveLength(0)
    expect(screen.queryAllByText('Sesam')).not.toHaveLength(0)
  })

  it('should display appropriate message when no chocolate found via search', async () => {
    render(<App />)
    await screen.findAllByText('Cacao Pur')
    await screen.findAllByText('EXCELLENCE 99%')
    await screen.findAllByText('Sesam')
    const searchBox = screen.getByPlaceholderText('Search by Name, Brand or Shop Link...')
    await user.type(searchBox, 'q')
    expect(screen.queryAllByText('Cacao Pur')).toHaveLength(0)
    expect(screen.queryAllByText('EXCELLENCE 99%')).toHaveLength(0)
    expect(screen.queryAllByText('Sesam')).toHaveLength(0)
    await screen.findByText('No Matching Results Found')
  })

  it('should display the appropriate Chocolate Details Modal on click of row', async () => {
    ensurePortalExists()
    render(<App />)
    const marzipanRow = await screen.findByText('Marzipan')
    await user.click(marzipanRow)
    await screen.findByText('Marzipan Details')
  })

  it('should display the appropriate Pie Chart on Chocolate Details Modal on click of row', async () => {
    ensurePortalExists()
    render(<App />)
    const marzipanRow = await screen.findByText('Marzipan')
    await user.click(marzipanRow)
    await screen.findByText('mocked Pie Chart')
  })

  it('should save the edited chocolate and close modal on Save Click', async () => {
    ensurePortalExists()
    render(<App />)
    const sesamRow = await screen.findByText('Sesam')
    await user.click(sesamRow)
    const name = screen.getByPlaceholderText('Name')
    const brand = screen.getByPlaceholderText('Brand')
    await user.type(name, 'e')
    await user.type(brand, 's')
    const saveButton = screen.getByText('Save')
    await user.click(saveButton)
    expect(screen.queryByText('Save')).toBe(null)
    await screen.findByText('Chocolate details edited')
    expect(screen.queryByText('Sesam')).toBe(null)
    expect(screen.queryByText('Sesame')).not.toBe(null)
  })

  it('should show error message if name or brand is not edited on Save Click', async () => {
    ensurePortalExists()
    render(<App />)
    const sesamRow = await screen.findByText('Sesam')
    await user.click(sesamRow)
    const saveButton = screen.getByText('Save')
    await user.click(saveButton)
    expect(screen.queryByText('Save')).not.toBe(null)
    await screen.findAllByText('Please edit name or brand to save')
  })

  it('should close the modal on cancel click', async () => {
    ensurePortalExists()
    render(<App />)
    const sesamRow = await screen.findByText('Sesam')
    await user.click(sesamRow)
    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)
    expect(screen.queryByText('Save')).toBe(null)
    await screen.findByText('Chocopedia Inventory')
  })
})
