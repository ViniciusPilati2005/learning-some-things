
# Observables

Uma pequena explicação de como funcionam os Observables neste caso de uso especifico.

## Explicação do projeto

Este é um projeto básico que possui uma tela de login, uma de cadastrar usuário, e uma main, cujo na qual eu seria redirecionado após fazer login/cadastrar meu usuário. 

### Declaração das queryKeys

 - Criação das keys para ser usadas como referência

```typescript
const ACCOUNT_REF_QUERY_KEY = (userUid: string | undefined) => ['ACCOUNT_REF_KEY', userUid]

const ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY = (userUid: string | undefined) => ['ACCOUNT_SUBSCRIPTION_KEY', userUid]

```
#### o que são queryKeys, e por que existem? 🤓
- Uma 🗝️ **única** para a query.
- A chave exclusiva fornecida é usada internamente para buscar novamente, armazenar em cache e compartilhar suas consultas em todo o aplicativo.
 - Criado dessa forma para garantir que cada key seja única e fácil de identificar 
 - Passar o userUid nesse caso garante que os dados sejam específicos para cada usuário autenticado.
--- 
  - Criação da função e obtendo a instancia do queryClient
  - O QueryClient pode ser usado para interagir com o cache atual, gerenciar as requisições, e muito mais...

```typescript
  export function useAccountQuery(userUid: string | undefined) {
    const queryClient = useQueryClient();
```
---
 - Abaixo, estou pegando a **referência** do banco de dados.
 - Definindo o userUid como opcional, para o caso de não possuir userUid e passando um valor default, para evitar erros de valores indefinidos(undefined).
 - Validando o valor com parse pra verificar se ele atende ao requisito do schema(ser tipo string).

 ### withConverter? toFirestore? fromFirestore?
 - O **withConverter** recebe um objeto com dois métodos: **toFirestore** e **fromFirestore**.
 - A função **toFirestore** é utilizada quando você deseja salvar ou atualizar um documento no Firestore usando a referência criada. Mesmo que você esteja apenas pegando a referência do documento, o converter serve para garantir que, **quando você precisar salvar dados nesse documento, eles estejam no formato correto**.
 - O método **fromFirestore** é usado para transformar os dados que vêm do Firestore no **formato que sua aplicação espera**.

```typescript
    const accountRef = doc(db, "accounts",  z.string().optional().default('undefined').parse(userUid)).withConverter({
        toFirestore: (account: Account) => account,
        fromFirestore: (snap) => accountSchema.parse(snap.data())
    });
```
---
 ### Criação da query principal
 - Criando uma constante que armazena o valor da query
 - Passado a querykey, para identificação.
 - Executando a função da query, para esperar o documento da conta do usuário, usando getDocs e passando a referência.
 - Retornando os dados do documento
 - Fazendo a query ficar ativa somente se existir usuário atual.
```typescript
    const result = useQuery({
        queryKey: ACCOUNT_REF_QUERY_KEY(userUid),
        queryFn: async() => {
            const accountSnap = await getDoc(accountRef);
            return accountSnap.data()
        },
        enabled: !!userUid
    })
```
### Uma segunda query? 🤔
#### Criando a query "observadora":
```typescript
    useQuery({
        queryKey: ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY(userUid),
        queryFn: async() => {
           queryClient.getQueryData<() => void>(ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY(userUid))?.()
            const unsubscribe = onSnapshot(accountRef, (accountSnap) => {
                const currentDoc = accountSnap.data()
                queryClient.setQueryData(ACCOUNT_REF_QUERY_KEY(userUid), currentDoc)
            })
            return () => {
                unsubscribe()
            }
        },
        enabled: !!userUid
    })
   
    return { result };
}
```

## Referência

 - [Tanstack Query](https://tanstack.com/query/latest)
 - [Tanstack Router](https://tanstack.com/router/latest)
 - [Zod](https://zod.dev/)
 - [Formik](https://formik.org/docs/overview)
 - [Firebase initialize](https://firebase.google.com/docs/firestore/quickstart?hl=pt-br#initialize)


