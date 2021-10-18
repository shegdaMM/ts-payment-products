import store from "@/store";

export default {
    methods: {
        onLoaderStatus (): void{
            store.commit('setloadProcess', true);
        },
        offLoaderStatus (): void {
            store.commit('setloadProcess', false);
        }
    }
};